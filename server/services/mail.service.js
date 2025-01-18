const nodemailer = require('nodemailer')

class MailService {
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD,
			},
		})
	}
	async sendOTPMail(emnail) {
		const otp = Math.floor(100000 + Math.random() * 900000) // 6 ta raqamli kod

		const hashedOtp = await bcrypt.hash(otp.toString(), 10)
	}
}

module.exports = new MailService()
