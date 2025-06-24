import supabase from '../../lib/supabase';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'البريد وكلمة السر مطلوبة' });
    }

    // ابحث عن الأدمن بالبريد
    const { data: admin, error } = await supabase
        .from('admin_accounts')
        .select('*')
        .eq('email', email)
        .single();

    if (error || !admin) {
        return res.status(401).json({ message: 'بيانات الدخول غير صحيحة' });
    }

    // تحقق من كلمة السر
    const valid = await bcrypt.compare(password, admin.encrypted_password);
    if (!valid) {
        return res.status(401).json({ message: 'بيانات الدخول غير صحيحة' });
    }

    // نجاح الدخول (يمكنك هنا إنشاء session أو JWT)
    return res.status(200).json({ success: true, admin: { id: admin.id, email: admin.email, role: admin.role } });
} 