import nodemailer from "nodemailer";
import { ENVS } from "./config";

type SendEmailOptions = {
	fromName: string;
	subject: string;
	text?: string;
	html: string;
	to: string | string[];
	attachments?: {
		filename: string;
		path?: string;
	}[];
};

// Configuración del servicio de email
export class EmailService {
	private transporter: nodemailer.Transporter;

	constructor() {
		// Configurar el transporter con Gmail
		this.transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: ENVS.EMAIL_USER,
				pass: ENVS.EMAIL_PASS,
			},
		});
	}

	async sendEmail({ to, subject, html, fromName, text, attachments }: SendEmailOptions) {
		try {
			const mailOptions = {
				from: `"${fromName}" <${ENVS.EMAIL_USER}>`,
				to,
				subject,
				text: text || "",
				html,
				attachments,
			};

			const info = await this.transporter.sendMail(mailOptions);
			console.log("Email enviado:", info.messageId);
			return { success: true, messageId: info.messageId };
		} catch (error) {
			console.error("Error al enviar email:", error);
			throw error;
		}
	}

	// Método para verificar la conexión
	async verifyConnection() {
		try {
			await this.transporter.verify();
			console.log("Servidor listo para enviar emails");
			return true;
		} catch (error) {
			console.error("Error de conexión:", error);
			return false;
		}
	}
}
