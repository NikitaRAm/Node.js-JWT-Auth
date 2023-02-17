import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv'
dotenv.config();

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true, 
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Account activation on ' + process.env.API_URL,
            text: '',
            html: 
                `
                    <div>
                        <h1>To activation click on this link</h1>
                        <a href='${link}'>${link}</a>
                    </div>
                `
        })
    }
}

export const mailService = new MailService();