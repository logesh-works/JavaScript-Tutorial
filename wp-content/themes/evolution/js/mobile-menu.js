(function () {
	// mobile menu
	let siteNav = document.querySelector(".site-menu");
	if (!siteNav) {
		return;
	}

	let toggle = document.querySelector(".menu-toggle");
	if (!toggle) {
		return;
	}

	toggle.addEventListener("click", function () {
		toggle.classList.toggle("activated");

		if (siteNav.classList.contains("active")) {
			this.setAttribute("aria-expanded", "false");
			this.setAttribute("aria-label", "menu");
			siteNav.classList.remove("active");
		} else {
			siteNav.classList.add("active");
			this.setAttribute("aria-label", "close menu");
			this.setAttribute("aria-expanded", "true");
		}
	});
})();
