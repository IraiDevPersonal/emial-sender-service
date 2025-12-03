import * as fs from "node:fs";
import { EmailService } from "./lib/email-service";

type Options = {
	to: string[];
	template: string;
	email: {
		fromName: string;
		subject: string;
		attachments: {
			filename: string;
			path: string;
		}[];
	};
};

export class App {
	private emailService = new EmailService();
	private email: Options["email"];
	private template: string = fs.readFileSync(
		"./templates/iarriagada-template.html",
		"utf-8"
	);
	private to: Options["to"];

	constructor(options: Options) {
		this.template = fs.readFileSync(options.template, "utf-8");
		this.email = options.email;
		this.to = options.to;
	}

	async execute() {
		const ok = await this.emailService.verifyConnection();
		if (!ok) return;

		const results = await Promise.allSettled(this.to.map((to) => this.sendEmail(to)));

		const success = results.filter((r) => r.status === "fulfilled").length;
		const failed = results.filter((r) => r.status === "rejected").length;

		console.log(
			`\n📊 Resumen: ${success} exitosos, ${failed} fallidos de ${this.to.length} total`
		);
	}

	private async sendEmail(to: string) {
		try {
			const payload = {
				attachments: this.email.attachments,
				fromName: this.email.fromName,
				subject: this.email.subject,
				html: this.template,
				to: to,
			};

			await this.emailService.sendEmail(payload);
			console.log("✅ Correo enviado a:", to);
		} catch (error) {
			console.error("❌ Error enviando correo a:", to, error);
			throw error;
		}
	}
}
