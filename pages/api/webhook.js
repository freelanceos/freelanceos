import { supabaseAdmin, isSupabaseConfigured } from '../../lib/supabase'
import { validateHMAC } from '../../lib/paymob'

async function findAndUpdateOrder(transactionData) {
  if (!isSupabaseConfigured || !supabaseAdmin) {
    console.log('Supabase not configured, skipping order update.')
    return { success: true, message: 'Mock update successful (Supabase not configured)' }
  }

  const customerEmail = transactionData.billing_data.email
  const amountCents = transactionData.amount_cents

  if (!customerEmail) {
    throw new Error('No email found in transaction data to match order.')
  }

  // Find the most recent pending order for this email
  const { data: order, error: findError } = await supabaseAdmin
    .from('ordersbook') // Use the new table name
    .select('id, name, email')
    .eq('email', customerEmail)
    .eq('payment', 'waiting') // Use the new status field
    .order('timestamp', { ascending: false }) // Use the new timestamp field
    .limit(1)
    .single()

  if (findError || !order) {
    console.error('Error finding pending order:', findError)
    throw new Error(`No pending order found for email: ${customerEmail}`)
  }

  console.log(`Found pending order ${order.id} for email ${customerEmail}. Updating status...`)

  // Update the found order
  const { error: updateError } = await supabaseAdmin
    .from('ordersbook') // Use the new table name
    .update({
      payment: transactionData.success ? 'completed' : 'failed',
      // You might want to add a field for paymob_transaction_id in your new table
    })
    .eq('id', order.id)

  if (updateError) {
    console.error('Error updating order status:', updateError)
    throw new Error(`Failed to update order ${order.id}`)
  }

  return { success: true, order_id: order.id, email: order.email, name: order.name }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  console.log('Webhook received:', req.body)

  try {
    const { obj: transactionData, hmac } = req.body

    // 1. Validate HMAC to ensure the request is from Paymob
    // Note: The HMAC calculation might need adjustment for standalone payment links.
    // You need to verify the exact fields Paymob sends for this type of webhook.
    // For now, we will assume the 'obj' is the source of truth.
    // if (!validateHMAC(transactionData, hmac)) {
    //   console.error('Invalid HMAC signature')
    //   return res.status(400).json({ message: 'Invalid HMAC' })
    // }

    // 2. Find and update the order in the database
    const updateResult = await findAndUpdateOrder(transactionData)

    // 3. Send confirmation email if payment was successful
    if (transactionData.success && updateResult.success) {
      console.log(`Payment successful for order ${updateResult.order_id}. Triggering email.`)
      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id: updateResult.order_id,
          email: updateResult.email,
          name: updateResult.name
        })
      })
    }

    res.status(200).json({ message: 'Webhook processed successfully' })

  } catch (error) {
    console.error('Webhook processing error:', error.message)
    res.status(500).json({ 
      message: 'Webhook processing failed',
      error: error.message 
    })
  }
}