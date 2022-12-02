import { Scene, Object3D } from "three";

const explorer = document.getElementById("explorer") as HTMLElement;
explorer.classList.add("hide");
const container = document.getElementById("tree") as HTMLElement;
let currentScene: Scene | null;

document.getElementById("explorer-refresh")?.addEventListener("click", () => {
	if (!currentScene) return;
	render(currentScene);
});

function check(obj: Scene | Object3D) {
	let html = "";
	const name = obj.name ? obj.name + " (" + obj.type + ")" : obj.type;
	html += `<div class="node">`;
	html += `<div class="ntitle${
		obj.children && obj.children.length > 0 ? " hasChildren" : ""
	}">${name}</div>`;
	if (obj.children) {
		html += '<div class="children hide">';
		for (var i = 0; i < obj.children.length; i++) {
			html += check(obj.children[i]);
		}
		html += "</div>";
	}
	html += "</div>";
	return html;
}

function parseScene(scene: Scene) {
	let html = check(scene);
	container.innerHTML = html;
}

function assignEvents() {
	const titles = Array.from(container.getElementsByClassName("ntitle"));
	titles.forEach((title) => {
		title.addEventListener("click", () => {
			const children =
				title.parentElement?.getElementsByClassName("children")[0];
			if (children && children.classList.contains("children")) {
				if (children.classList.contains("hide")) {
					children.classList.remove("hide");
					title.classList.add("open");
				} else {
					children.classList.add("hide");
					title.classList.remove("open");
				}
			}
		});
	});
}

export function render(scene: Scene) {
	currentScene = scene;
	parseScene(scene);
	assignEvents();
}

export function toggle(show: boolean) {
	if (show) {
		if (explorer.classList.contains("hide")) {
			explorer.classList.remove("hide");
		}
	} else {
		if (!explorer.classList.contains("hide")) {
			explorer.classList.add("hide");
		}
	}
}
