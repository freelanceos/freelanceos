export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { email, name, phone, order_id, fromAdmin = false } = req.body;
    const resendApiKey = process.env.RESEND_API_KEY;

    // Check if Resend is configured
    if (!resendApiKey || resendApiKey === "your_resend_api_key") {
      console.log("Resend not configured - mock email sending for:", {
        email,
        name,
        order_id,
      });
      return res.status(200).json({
        message: "Mock email sent successfully (Resend not configured)",
      });
    }

    // Import Resend only if configured
    const { Resend } = await import("resend");
    const resend = new Resend(resendApiKey);

    const downloadLink = ${process.env.NEXT_PUBLIC_SITE_URL}/download?token=${order_id};

    // Email content based on source
    const customerEmailContent = fromAdmin
      ? // Content when sent from admin panel
        
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 15px;">
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
            <h1 style="color: #2563eb; text-align: center; font-size: 28px; margin-bottom: 20px;">🎉 مبروك ${name}! 🎉</h1>
            <div style="background: #f8f9ff; padding: 20px; border-radius: 8px; border-right: 4px solid #2563eb; margin: 20px 0;">
              <p style="font-size: 18px; color: #333; line-height: 1.6; margin: 0;">
                تهانينا! تم تأكيد طلبك من إدارة FreelanceOS وأصبح الكتاب جاهز للتحميل الآن.
              </p>
            </div>
            <div style="text-align: center; margin: 40px 0;">
              <p style="color: #666; margin-bottom: 20px;">يمكنك تحميل كتاب "رحلة الانتشار - دليل النجاح على تيك توك" من الرابط أدناه:</p>
              <a href="${downloadLink}" style="background: linear-gradient(45deg, #28a745, #20c997); color: white; padding: 18px 40px; text-decoration: none; border-radius: 25px; display: inline-block; font-size: 18px; font-weight: bold; box-shadow: 0 5px 15px rgba(40, 167, 69, 0.4); transition: all 0.3s;">
                📚 تحميل الكتاب الآن
              </a>
            </div>
            <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0;">
              <p style="color: #155724; margin: 0; font-weight: 500;">✅ تم إرسال هذه الرسالة من إدارة FreelanceOS مباشرة</p>
            </div>
            <hr style="border: none; border-top: 2px solid #eee; margin: 30px 0;">
            <p style="color: #666; font-size: 14px; text-align: center; margin: 0;">
              نتمنى لك قراءة ممتعة ونجاحاً باهراً على تيك توك! 🚀<br>
              فريق FreelanceOS
            </p>
            <p style="color: #856404; margin: 0; font-size: 14px;">
              💡 نصيحة: احفظ هذا الرابط في مكان آمن للرجوع إليه لاحقاً
            </p>
          </div>
        </div>
      
      : // Content for automatic emails
        
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px; border-radius: 10px;">
          <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #2563eb; text-align: center; font-size: 24px;">شكراً لك ${name}!</h1>
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              تم استلام بيانات طلبك بنجاح.  كتاب "رحلة الانتشار - دليل النجاح على تيك توك" سوف يتم الرد وارسال الكتاب سريعا 
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
              
            </div>
            <p style="color: #666; font-size: 14px; text-align: center;">
              فريق FreelanceOS
            </p>
          </div>
        </div>
      ;

    // Email to customer
    await resend.emails.send({
      from: "FreelanceOS <admin@freelanceos.online>",
      to: email,
      subject: fromAdmin
        ? "🎉 تم تأكيد طلبك من إدارة FreelanceOS - كتاب رحلة الانتشار"
        : "تم استلام بيانات طلبك - كتاب رحلة الانتشار",
      html: customerEmailContent,
    });

    // Email to admin (only for automatic orders, not when sent from admin panel)
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail && adminEmail !== "admin@example.com" && !fromAdmin) {
      await resend.emails.send({
        from: "FreelanceOS <admin@freelanceos.online>",
        to: adminEmail,
        subject: "طلب جديد - كتاب رحلة الانتشار",
        html: 
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px; border-radius: 10px;">
            <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #dc3545; border-bottom: 2px solid #dc3545; padding-bottom: 10px;">🚨 طلب جديد تم تأكيده</h2>
              <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
                <p style="margin: 10px 0;"><strong>👤 الاسم:</strong> ${name}</p>
                <p style="margin: 10px 0;"><strong>📧 الإيميل:</strong> ${email}</p>
                <p style="margin: 10px 0;"><strong>📱 رقم الهاتف:</strong> ${phone}</p>
                <p style="margin: 10px 0;"><strong>🆔 رقم الطلب:</strong> ${order_id}</p>
                <p style="margin: 10px 0;"><strong>⏰ التوقيت:</strong> ${new Date().toLocaleDateString("ar-EG")} - ${new Date().toLocaleTimeString("ar-EG")}</p>
              </div>
              <div style="background: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p style="color: #155724; margin: 0;">
                  💡 يمكنك إدارة هذا الطلب من لوحة التحكم الإدارية
                </p>
              </div>
            </div>
          </div>
        ,
      });
    }

    // Send WhatsApp automatically for new orders (not from admin)
    if (!fromAdmin) {
      try {
        const downloadLink = ${process.env.NEXT_PUBLIC_SITE_URL}/download?token=${order_id};
        const whatsappMessage = مرحباً ${name}،

تم تأكيد طلبك لكتاب "رحلة الانتشار - دليل النجاح على تيك توك"

يمكنك تحميل الكتاب من الرابط التالي:
${downloadLink}

رقم الطلب: ${order_id.substring(0, 8)}

نتمنى لك قراءة ممتعة ونجاحاً باهراً على تيك توك!

فريق FreelanceOS;

        const phoneNumber = phone.replace(/[^0-9]/g, '');
        const whatsappNumber = phoneNumber.startsWith('01') ? 2${phoneNumber} : phoneNumber;
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = https://wa.me/${whatsappNumber}?text=${encodedMessage};
        
        console.log('WhatsApp message prepared for automatic sending:', {
          customer: name,
          phone: whatsappNumber,
          orderId: order_id.substring(0, 8)
        });
        
        // Note: In a real scenario, you would integrate with WhatsApp Business API
        // For now, we'll log the URL that would be used
        console.log('WhatsApp URL generated:', whatsappUrl);
        
      } catch (whatsappError) {
        console.error('WhatsApp preparation error:', whatsappError);
        // Don't fail the entire process if WhatsApp preparation fails
      }
    }

    res.status(200).json({ 
      message: "Emails sent successfully",
      whatsapp: !fromAdmin ? "WhatsApp message prepared" : "WhatsApp skipped (admin send)"
    });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ message: "Failed to send emails" });
  }
}


قال ChatGPT:
