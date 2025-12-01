import { App } from "./app";

const iraidevApp = new App({
	to: ["dev.iarriagada@gmail.com"],
	template: "./templates/iarriagada-template.html",
	email: {
		fromName: "Ignacio Arriagada",
		subject: "Curriculum Informatico",
		attachments: [
			{
				filename: "curriculum-iarriagada.pdf",
				path: "./public/curriculum-iarriagada.pdf",
			},
		],
	},
});

(async () => {
	await iraidevApp.execute();
})();
