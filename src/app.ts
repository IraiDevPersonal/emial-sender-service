import * as fs from "node:fs";
import { EmailService } from "./lib/email-service";
import { logger } from "./lib/logger";

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
		this.emailService.verifyConnection();
		await Promise.all(this.to.map((to) => this.sendEmail(to)));
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
			logger.info("Correo enviado a: ", { to: payload.to });
		} catch (error) {
			logger.error("Error enviando correo", error);
		}
	}
}
