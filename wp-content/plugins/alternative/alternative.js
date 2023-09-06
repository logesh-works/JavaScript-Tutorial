(function () {
	async function checkAdBlock() {
		let blocked;

		async function request() {
			try {
				return fetch(
					new Request("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", {
						method: "HEAD",
						mode: "no-cors"
					})
				)
					.then(function () {
						// there is no AdBlocker
						blocked = false;
						return blocked;
					})
					.catch(function (e) {
						// Failed due to an AdBlocker
						blocked = true;
						return blocked;
					});
			} catch (error) {
				blocked = true;
				return blocked;
			}
		}

		return blocked !== undefined ? blocked : await request();
	}

	/*
	 * replace ad code by
	 */

	function replaceAds() {
		if (!adsOptions) {
			return;
		}

		adsOptions.forEach((option) => {
			let ads = document.querySelectorAll(option.selector);
			if (ads) {
				for (let i = 0; i < ads.length; i++) {
					ads[i].innerHTML = option.code;
				}
			}
		});
	}

	addEventListener("DOMContentLoaded", async function () {
		const detected = await checkAdBlock();
		if (detected) {
			replaceAds();
		}
	});
})();
