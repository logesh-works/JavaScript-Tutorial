(function () {
	// only support clipboard API
	if (!navigator.clipboard) {
		return;
	}

	// swap two icons
	function swapIcons(btn) {
		let css = btn.classList;
		if (css.contains("icon-copy")) {
			css.remove("icon-copy");
			css.add("icon-done");
			// wait for 1 second and add the icon-copy back
			setTimeout(function () {
				css.remove("icon-done");
				css.add("icon-copy");
			}, 1000);
		}
	}

	function onCopyButtonClick(e) {
		const btn = e.target;
		// find its parent and query the code tag
		if (btn.parentNode) {
			const code = btn.parentNode.querySelector("code");
			if (code) {
				navigator.clipboard.writeText(code.textContent || code.innerText);
				swapIcons(btn);
			}
		}
	}

	// get all codeBlocks
	const codeBlocks = document.querySelectorAll(".wp-block-code");
	if (codeBlocks.length > 0) {
		let btnCopy = document.createElement("i");
		btnCopy.classList.add("icon-copy");
		btnCopy.classList.add("btn-copy-code");

		for (let i = 0; i < codeBlocks.length; i++) {
			codeBlocks[i].appendChild(btnCopy.cloneNode(true));
			codeBlocks[i].addEventListener("click", onCopyButtonClick);
		}
	}
})();
