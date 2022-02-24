import {createTransport} from 'nodemailer'

export default async function SendMail({to, title, body}) {
    const transporter = createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    console.log(transporter)
    const mailOptions = {
        from: "WebTool Auth",
        to: to,
        subject: title,
        html: body
    };
    try {
        await transporter.sendMail(mailOptions);
        return true
    } catch (err) {
        return false
    }


}

