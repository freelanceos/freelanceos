import { serialize } from 'cookie'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken' // Added jwt import
import { supabase } from '../../../../lib/supabase'

const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key-for-dev'; // Added JWT_SECRET

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    try {
        const { email, password } = req.body || {}

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'البريد الإلكتروني وكلمة المرور مطلوبان'
            })
        }

        // بيانات تجريبية لتسجيل الدخول في حالة الطوارئ
        if (email === "admin@freelanceos.online" && password === "admin123") {
            const adminUser = {
                id: "demo-admin-id",
                email: "admin@freelanceos.online",
                role: "admin",
            }
            // Generate JWT token for emergency login
            const emergencyToken = jwt.sign(
                {
                    id: adminUser.id,
                    email: adminUser.email,
                    role: adminUser.role
                },
                JWT_SECRET,
                { expiresIn: '1d' }
            )
            res.setHeader('Set-Cookie', serialize('admin_session', emergencyToken, { // Store JWT
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 24 * 60 * 60,
                path: '/'
            }))
            return res.status(200).json({
                success: true,
                message: "تم تسجيل الدخول بنجاح (وضع الطوارئ)",
                admin: adminUser
            })
        }

        // تحقق من تهيئة supabase
        if (!supabase) {
            return res.status(500).json({
                success: false,
                message: 'Supabase غير مهيأ بشكل صحيح، تحقق من متغيرات البيئة.'
            })
        }

        // تسجيل دخول فعلي من قاعدة البيانات
        const { data: admin, error } = await supabase
            .from("admin_accounts")
            .select("id, email, encrypted_password, role")
            .eq("email", email.toLowerCase().trim())
            .single()

        if (error) {
            return res.status(500).json({
                success: false,
                message: 'خطأ في قاعدة البيانات: ' + (error.message || error)
            })
        }

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "البريد الإلكتروني أو كلمة المرور غير صحيحة"
            })
        }

        // تحقق من الدور
        if (admin.role !== "admin" && admin.role !== "user") {
            return res.status(403).json({
                success: false,
                message: "غير مصرح لك بالدخول، الدور غير مسموح به"
            })
        }

        // تأكد من وجود كلمة مرور مشفرة صالحة
        if (!admin.encrypted_password || typeof admin.encrypted_password !== "string") {
            return res.status(500).json({
                success: false,
                message: "كلمة المرور غير صالحة"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, admin.encrypted_password)
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "البريد الإلكتروني أو كلمة المرور غير صحيحة"
            })
        }

        const adminUser = {
            id: admin.id,
            email: admin.email,
            role: admin.role
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: adminUser.id,
                email: adminUser.email,
                role: adminUser.role
            },
            JWT_SECRET,
            { expiresIn: '1d' }
        )

        res.setHeader('Set-Cookie', serialize('admin_session', token, { // Store JWT
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60, // 1 day
            path: '/'
        }))
        return res.status(200).json({
            success: true,
            message: "تم تسجيل الدخول بنجاح",
            admin: { // Return admin user details, but not the token itself in the body
                id: adminUser.id,
                email: adminUser.email,
                role: adminUser.role
            }
        })
    } catch (error) {
        console.error('Admin login error:', error)
        res.status(500).json({
            success: false,
            message: error.message || 'حدث خطأ في تسجيل الدخول'
        })
    }
}
