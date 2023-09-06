(function () {
	const root = document.querySelector("html");
	const switcher = document.querySelector(".switch-theme");

	if (!root || !switcher) {
		return;
	}

	const setTheme = (theme) => (root.dataset.theme = theme);
	const getTheme = () => root.dataset.theme;

	// get current theme stored in the local storage
	// const currentTheme = localStorage.getItem("theme") ? localStorage.getItem("theme") : "light";
	// setTheme(currentTheme);

	switcher.addEventListener("click", toggleTheme);

	// toggle a theme
	function toggleTheme() {
		let theme = getTheme() === "dark" ? "light" : "dark";
		setTheme(theme);
		// store it to local storage
		localStorage.setItem("theme", theme);
	}
})();
