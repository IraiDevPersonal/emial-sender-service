import { App } from "./app";
import { ENVS } from "./lib/config";

const destinations = ENVS.IS_TEST ? ["ignacio.arr01@gmail.com"] : ENVS.DESTINATIONS;

const iraidevApp = new App({
	to: destinations,
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
