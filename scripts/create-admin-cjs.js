const { createClient } = require('@supabase/supabase-js')
const bcrypt = require('bcryptjs')
require('dotenv').config({ path: '.env.local' })

async function createFirstAdmin() {
    try {
        console.log('Creating first admin account...')

        // Get Supabase credentials from environment
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

        if (!supabaseUrl || !supabaseServiceKey) {
            throw new Error('Supabase credentials not found in environment')
        }

        // Create Supabase admin client
        const supabase = createClient(supabaseUrl, supabaseServiceKey)

        // Admin credentials
        const email = 'admin@example.com'
        const password = 'admin123'
        const role = 'admin'

        // Hash password
        const saltRounds = 12
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        // Insert admin account
        const { data, error } = await supabase
            .from('admin_accounts')
            .insert([{
                email,
                encrypted_password: hashedPassword,
                role
            }])
            .select('id, email, role, created_at')
            .single()

        if (error) {
            throw error
        }

        console.log('Admin account created successfully!')
        console.log('Email:', data.email)
        console.log('Role:', data.role)
        console.log('ID:', data.id)
        console.log('\nYou can now login with:')
        console.log('Email:', email)
        console.log('Password:', password)

    } catch (error) {
        console.error('Error creating admin account:', error.message)

        if (error.message.includes('duplicate key')) {
            console.log('Admin account with this email already exists.')
        }
        process.exit(1)
    }
}

// Run the script
createFirstAdmin()
