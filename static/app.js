const form = document.querySelector('#form');

form.addEventListener("submit", function(e){
	e.preventDefault();
	getColors();
});

// Hit Flask endpoint to run OpenAI prompt
function getColors(){
	const query = form.elements.query.value

	fetch("/palette", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: new URLSearchParams({
			query: query
		})
	})
	.then((response) => response.json())
	.then(data => {
		const colors = data.colors;
		const container = document.querySelector(".container");
		createColorBoxes(colors, container);
	});
}

// Update DOM based on colors received back from OpenAI
function createColorBoxes(colors, parent){

	parent.innerHTML = "";

	for(const color of colors){
		const div = document.createElement("div");
		div.classList.add('color');
		div.style.backgroundColor = color;
		div.style.width = `calc(100%/${colors.length})`;

		// Copy color hex to clipboard on user click
		div.addEventListener("click", function(){
			navigator.clipboard.writeText(color);
		})

		const span = document.createElement("span");
		span.innerText = color;

		div.appendChild(span);
		parent.appendChild(div);
	}

}