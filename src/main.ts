import { App } from "./app";
import { ENVS } from "./lib/config";

const isTest = true;

const iraidevApp = new App({
	to: ["ignacio.arr01@gmail.com", ...(isTest ? [] : ENVS.DESTINATIONS)],
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
