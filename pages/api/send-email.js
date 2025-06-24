export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { email, name, phone, order_id } = req.body
    const resendApiKey = process.env.RESEND_API_KEY

    // Check if Resend is configured
    if (!resendApiKey || resendApiKey === 'your_resend_api_key') {
      console.log('Resend not configured - mock email sending for:', { email, name, order_id })
      return res.status(200).json({ message: 'Mock email sent successfully (Resend not configured)' })
    }

    // Import Resend only if configured
    const { Resend } = await import('resend')
    const resend = new Resend(resendApiKey)

    const downloadLink = `${process.env.NEXT_PUBLIC_SITE_URL}/download?token=${order_id}`

    // Email to customer
    await resend.emails.send({
      from: 'FreelanceOS <admin@freelanceos.online>',
      to: email,
      subject: 'تم تأكيد طلبك - كتاب رحلة الانتشار',
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb; text-align: center;">شكراً لك ${name}!</h1>
          <p>تم تأكيد طلبك بنجاح. يمكنك تحميل كتاب "رحلة الانتشار - دليل النجاح على تيك توك" من الرابط أدناه:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${downloadLink}" style="background: #2563eb; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">تحميل الكتاب</a>
          </div>
          <p>رقم الطلب: ${order_id}</p>
          <p>نتمنى لك قراءة ممتعة ونجاحاً باهراً على تيك توك!</p>
        </div>
      `
    })

    // Email to admin
    const adminEmail = process.env.ADMIN_EMAIL
    if (adminEmail && adminEmail !== 'admin@example.com') {
      await resend.emails.send({
        from: 'FreelanceOS <admin@freelanceos.online>',
        to: adminEmail,
        subject: 'طلب جديد - كتاب رحلة الانتشار',
        html: `
          <h2>طلب جديد تم تأكيده</h2>
          <p><strong>الاسم:</strong> ${name}</p>
          <p><strong>الإيميل:</strong> ${email}</p>
          <p><strong>رقم الهاتف:</strong> ${phone}</p>
          <p><strong>رقم الطلب:</strong> ${order_id}</p>
        `
      })
    }

    res.status(200).json({ message: 'Emails sent successfully' })

  } catch (error) {
    console.error('Email sending error:', error)
    res.status(500).json({ message: 'Failed to send emails' })
  }
}