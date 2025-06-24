import { supabase } from '../../../lib/supabase'
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    try {
        // Only allow this in development
        if (process.env.NODE_ENV !== 'development') {
            return res.status(403).json({ message: 'Setup only allowed in development' })
        }

        if (!supabase) {
            return res.status(500).json({
                message: 'Supabase not configured',
                success: false
            })
        }

        const { email, password, role } = req.body

        // Use default values if not provided
        const adminEmail = email || 'admin@example.com'
        const adminPassword = password || 'admin123'
        const adminRole = role || 'admin'

        // Hash password
        const saltRounds = 12
        const hashedPassword = await bcrypt.hash(adminPassword, saltRounds)

        // Insert admin account directly using regular client
        // Note: This requires RLS to be disabled on admin_accounts table or proper policies
        const { data, error } = await supabase
            .from('admin_accounts')
            .insert([{
                email: adminEmail,
                encrypted_password: hashedPassword,
                role: adminRole
            }])
            .select('id, email, role, created_at')
            .single()

        if (error) {
            console.error('Create admin account error:', error)
            throw error
        }

        res.status(200).json({
            success: true,
            admin: {
                id: data.id,
                email: data.email,
                role: data.role
            },
            message: 'Admin account created successfully',
            credentials: {
                email: adminEmail,
                password: adminPassword
            }
        })

    } catch (error) {
        console.error('Admin setup error:', error)

        if (error.message.includes('duplicate key')) {
            return res.status(409).json({
                message: 'Admin account already exists',
                success: false
            })
        }

        res.status(500).json({
            message: 'Failed to create admin account',
            success: false,
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}
