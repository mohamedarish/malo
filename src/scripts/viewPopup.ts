const selection = document.getSelection();

console.log(selection);

document.body.textContent = "";

const header = document.createElement("h1");
header.innerText = selection?.toString() || "";
document.body.appendChild(header);