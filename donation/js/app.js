(function () {
	let choices = document.querySelectorAll(".choice");
	let amountEl = document.querySelector(".amount");
	let form = document.querySelector("#donation-form");
	let errorEl = document.querySelector(".donation-error");

	//
	const debounce = (fn, delay = 500) => {
		let timeoutId;

		return (...args) => {
			// cancel the previous timer
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
			// setup a new timer
			timeoutId = setTimeout(() => {
				fn.apply(null, args);
			}, delay);
		};
	};

	// form submit

	form.addEventListener("submit", (event) => {
		event.preventDefault();
		// only submit the form if the donation is larger
		// than 4.99
		let donationAmount = parseFloat(amount.value);
		if (donationAmount >= MININUM_DONATION) {
			form.submit();
		} else {
		}
	});

	const amountChange = function () {
		let amount = parseFloat(amountEl.value);

		if (amount < MININUM_DONATION) {
			errorEl.classList.remove("visually-hidden");
			amountEl.classList.add("error");
		} else {
			errorEl.classList.add("visually-hidden");
			amountEl.classList.remove("error");
		}
		selectChoice(choices, amount);
	};

	const amountChangeHandler = debounce(amountChange);

	// event listeners
	amountEl.addEventListener("input", amountChangeHandler);

	for (const choice of choices) {
		choice.addEventListener("click", function (e) {
			changeSelected(choices, this);
			amountEl.value = this.dataset.amount;
			amountChange();
		});
	}

	// utility functions
	function setSelected(choice) {
		if (!choice.classList.contains("selected")) {
			choice.classList.add("selected");
		}
	}

	function removeSelected(choice) {
		if (choice.classList.contains("selected")) {
			choice.classList.remove("selected");
		}
	}

	function changeSelected(choices, selectedChoice) {
		for (const choice of choices) {
			if (choice !== selectedChoice) {
				choice.classList.remove("selected");
			}
		}
		setSelected(selectedChoice);
	}

	function selectChoice(choices, amount) {
		// set to true if enterend amount match
		let matched = false;
		for (const choice of choices) {
			if (choice.dataset.amount == amount) {
				setSelected(choice);
				matched = true;
			} else {
				removeSelected(choice);
			}
		}
		// set the selected to other
		if (!matched) {
			setSelected(choices[choices.length - 1]);
		}
	}
})(MININUM_DONATION);
