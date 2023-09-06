// was this helpful plugin
(function () {
	const options = wth_js_lang;
	let post;

	// get wth elements
	const wth = document.querySelector(".helpful-block-content");
	if (!wth) {
		return;
	}

	const btnYes = wth.querySelector(".helpful-block-content .wth-yes-btn");
	const btnNo = wth.querySelector(".helpful-block-content .wth-no-btn");
	const btnSubmit = wth.querySelector(".wth-btn-submit");
	const btnCancel = wth.querySelector(".wth-btn-cancel");
	const feedbackForm = wth.querySelector(".wth-form");
	const messageEl = document.querySelector(".wth-message");

	messageEl.addEventListener("change", function () {
		if (this.classList.contains("wth-feedback-error") && this.value.trim() !== "") {
			this.classList.remove("wth-feedback-error");
		}
	});

	// handle NO button click event
	btnNo.addEventListener("click", function (e) {
		feedback(this, options.negative_feedback_required === "true", true);
		// disable the YES button
		btnYes.disabled = true;
	});

	// handle YES button click event
	btnYes.addEventListener("click", function (e) {
		feedback(this, options.positive_feedback_required === "true", false);
		// disable the YES button
		btnNo.disabled = true;
	});

	btnCancel.addEventListener("click", function (e) {
		// remove the error class
		if (messageEl.classList.contains("wth-feedback-error")) {
			messageEl.classList.remove("wth-feedback-error");
		}

		hideFeedbackForm();
		btnYes.disabled = false;
		btnNo.disabled = false;
	});

	function feedback(element, feedbackRequired, isNegative = true) {
		post = getPost(element);
		// send immediately if feedback is not required
		if (!feedbackRequired) {
			return sendFeedback(post, options, false);
		}
		// show the feedback form if it is required
		showFeedbackForm(post, options, isNegative);

		//
	}

	// handle submit event at wth block and select
	// the id of the submit button
	btnSubmit.addEventListener("click", function (e) {
		sendFeedback(post, options);
	});

	function getPost(element) {
		return {
			url: element.getAttribute("data-post-url"),
			id: element.getAttribute("data-post"),
			title: element.getAttribute("data-post-title"),
			response: element.getAttribute("data-response")
		};
	}

	function hideFeedbackForm() {
		feedbackForm.classList.add("hidden");
	}

	// create negative feedback form
	function showFeedbackForm(post, options, isNegative) {
		// get the feedback form element and show it

		feedbackForm.classList.remove("hidden");

		// set the title
		feedbackForm.querySelector(".wth-title").textContent = isNegative
			? options.wth_title_nothank
			: options.wth_title_yesthank;

		// set data for the submit button
		btnSubmit.setAttribute("data-response", post.response);
		btnSubmit.setAttribute("data-post", post.id);
		btnSubmit.setAttribute("value", options.submit_text);
	}

	function showMessage({ success, message }) {
		const className = success ? "wth-success" : "wth-error";
		const messageHTML = `<p class="${className}">${message}</p>`;
		// should remove the event handler of the form
		wth.innerHTML = messageHTML;
	}

	function showProgress() {
		const spinnerHTML = `
			<div class="wth-loader">
				<svg class="spinner" viewBox="0 0 50 50">
					<circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
				</svg>
				<p>Sending your feedback ...</p>
			</div>
		`;
		wth.innerHTML = spinnerHTML;
	}

	// get feedback data
	async function sendFeedback(post, options, messageRequired = true) {
		let message = "";
		if (messageRequired) {
			message = messageEl.value.trim();
			if (!message) {
				messageEl.classList.add("wth-feedback-error");
				return;
			}
		}
		const feedback = {
			post_id: post.id,
			response: post.response,
			message: messageRequired ? message : "",
			title: document.querySelector("h1").innerText.trim(),
			action: "wth_ajax_call",
			operation: "wthp_log_feedback",
			nonce: options.nonce
		};

		// send feedback
		try {
			// show the progress icon
			showProgress();

			// send the feedback to the server
			const response = await fetch(options.ajax_url, {
				method: "POST",
				credentials: "same-origin",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					"Cache-Control": "no-cache"
				},
				body: new URLSearchParams(feedback)
			});

			const result = await response.json();

			// remove the form and show the message
			showMessage(result);
		} catch (error) {
			console.log(error);
		}
	}
})();
