import meangings from "../types/meanings";

document.addEventListener("DOMContentLoaded", async () => {
	const meanings = await browser.storage.local.get("meanings") as { "meanings": meangings[] };

	console.log("content_script: ", meanings.meanings);

	document.body.innerHTML = meanings.meanings[0].meaning[0];
});