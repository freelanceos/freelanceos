import { supabase } from './supabase'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function createAdminAccount(email, password, role = 'admin') {
    if (!supabase) {
        throw new Error('Supabase not configured')
    }

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
        console.error('Create admin account error:', error)
        throw error
    }

    return data
}

export async function loginAdmin(email, password) {
    if (!supabase) {
        throw new Error('Supabase not configured')
    }

    // Get admin account
    const { data: admin, error } = await supabase
        .from('admin_accounts')
        .select('id, email, role, encrypted_password, created_at')
        .eq('email', email)
        .single()

    if (error || !admin) {
        throw new Error('Invalid credentials')
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, admin.encrypted_password)
    if (!validPassword) {
        throw new Error('Invalid credentials')
    }

    // Generate JWT token
    const token = jwt.sign(
        {
            id: admin.id,
            email: admin.email,
            role: admin.role
        },
        JWT_SECRET,
        { expiresIn: '1d' }
    )

    // Remove sensitive data
    delete admin.encrypted_password

    return { admin, token }
}

export async function verifyAdminToken(token) {
    try {
        // Verify JWT token
        const decoded = jwt.verify(token, JWT_SECRET)

        // Get fresh admin data from database
        const { data: admin, error } = await supabase
            .from('admin_accounts')
            .select('id, email, role, created_at')
            .eq('id', decoded.id)
            .single()

        if (error || !admin) {
            throw new Error('Admin not found')
        }

        return admin
    } catch (error) {
        throw new Error('Invalid token')
    }
}

export async function getAdminById(id) {
    if (!supabase) {
        throw new Error('Supabase not configured')
    }

    const { data: admin, error } = await supabase
        .from('admin_accounts')
        .select('id, email, role, created_at')
        .eq('id', id)
        .single()

    if (error || !admin) {
        throw new Error('Admin not found')
    }

    return admin
}
