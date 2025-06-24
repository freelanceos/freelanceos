import './load-env.js'
import { createAdminAccount } from '../lib/adminAuth.js'

async function createFirstAdmin() {
    try {
        console.log('Creating first admin account...')

        // You can modify these values or make them configurable
        const email = 'admin@example.com'
        const password = 'admin123'
        const role = 'admin'

        const admin = await createAdminAccount(email, password, role)

        console.log('Admin account created successfully!')
        console.log('Email:', admin.email)
        console.log('Role:', admin.role)
        console.log('ID:', admin.id)
        console.log('\nYou can now login with:')
        console.log('Email:', email)
        console.log('Password:', password)

    } catch (error) {
        console.error('Error creating admin account:', error.message)

        if (error.message.includes('duplicate key')) {
            console.log('Admin account with this email already exists.')
        }
    }
}

// Run the script
createFirstAdmin()
