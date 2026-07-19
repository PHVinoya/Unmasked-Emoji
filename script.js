const board = document.querySelector(".board");
const cards = board.querySelectorAll(".card");
const triesValue = document.querySelector(".tries-value");
const best = document.querySelector(".interface-data-best");
const bestValue = best.querySelector(".best-value");
const marquee = document.querySelector(".marquee");
const marqueeText = document.querySelector(".marquee-text");
const muteBtn = document.querySelector("#toggle-mute");
const faces = ["🙂", "😄", "😜", "😮", "😉", "😌"];
const cls = {
	completed: "is-complete",
	combo: "is-combo",
	loading: "is-loading",
	matched: "is-matched",
	waiting: "is-waiting"
};
let selectedCard;
let triesCount = 0;
let matchCount = 0;
let comboCount = 0;
let bestCount;
let completeCount = faces.length;

const shuffle = (arr) => {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}

	return arr;
};

const displayMarquee = (str, isCombo) => {
	marquee.classList.toggle(cls.combo, isCombo);
	marqueeText.textContent = str;
	marquee.style.setProperty("display", "grid");
};

const toggleCardSelected = (card) => {
	const isPressed = card.getAttribute("aria-pressed") === "true";
	card.setAttribute("aria-pressed", isPressed ? "false" : "true");
};

const setMatchedProps = (el) => {
	el.setAttribute("disabled", "");
	el.classList.add(cls.matched);
};

const updateTries = (value) => {
	triesCount = value;
	triesValue.textContent = value;
};

const checkMatch = (card) => {
	const cardFace = card.getAttribute("data-face");
	const selectedCardFace = selectedCard.getAttribute("data-face");

	board.classList.add(cls.waiting);

	if (cardFace === selectedCardFace) {
		setMatchedProps(card);
		setMatchedProps(selectedCard);
		matchCount++;
		comboCount++;
		playSfx("correct");

		if (comboCount > 1) {
			displayMarquee(`${comboCount}×!`, true);
		}

		setTimeout(() => {
			card.removeAttribute("aria-pressed");
			selectedCard.removeAttribute("aria-pressed");
			selectedCard = null;
			board.classList.remove(cls.waiting);
		}, 500);
	} else {
		comboCount = 0;
		playSfx("wrong");

		setTimeout(() => {
			toggleCardSelected(card);
			toggleCardSelected(selectedCard);
			selectedCard = null;
			board.classList.remove(cls.waiting);
		}, 1000);
	}

	updateTries(triesCount + 1);
};

const checkBest = () => {
	if (!bestCount || triesCount < bestCount) {
		best.style.setProperty("display", "flex");
		bestCount = triesCount;
		bestValue.textContent = bestCount;
	}
};

const checkComplete = () => {
	if (matchCount !== completeCount) {
		return;
	}

	playSfx("complete");
	stopBgMusic();
	displayMarquee("Unmasked!", false);

	setTimeout(() => {
		board.classList.add(cls.completed);
	}, 1000);
};

const resetGame = () => {
	if (board.classList.contains(cls.completed)) {
		checkBest();
	}

	matchCount = 0;
	comboCount = 0;
	updateTries(0);
	selectedCard = null;

	cards.forEach((card) => {
		card.removeAttribute("disabled");
		card.removeAttribute("aria-pressed");
		card.classList.remove(cls.matched);
	});

	board.classList.remove(cls.completed);
};

const setupGame = () => {
	const fragment = document.createDocumentFragment();
	const shuffledFaces = shuffle(faces.concat(faces));
	const shuffledCards = shuffle([...cards]);

	shuffledCards.forEach((card, index) => {
		const face = shuffledFaces[index];

		card.setAttribute("data-face", face);
		card.style.setProperty("--i", index + 1);
		card.querySelector(".face").innerHTML = face;
		fragment.append(card);
	});

	board.classList.add(cls.loading);
	board.replaceChildren(fragment);
	setTimeout(() => {
		board.classList.remove(cls.loading);
	}, 1000);
};

cards.forEach((card) =>
	card.addEventListener("click", () => {
		playSfx("flip");
		toggleCardSelected(card);

		if (!selectedCard) {
			selectedCard = card;
			return;
		}

		if (card === selectedCard) {
			selectedCard = null;
			return;
		}

		checkMatch(card);
		checkComplete();
	})
);

marquee.addEventListener("animationend", (e) => {
	if (e.animationName !== "marquee-reveal") {
		return;
	}
	marquee.style.setProperty("display", "none");
});

document.querySelector("#reset-game").addEventListener("click", () => {
	playSfx("shuffle");
	resetGame();
	setupGame();
});

muteBtn.addEventListener("click", () => {
	const muted = toggleMute();
	muteBtn.textContent = muted ? "🔇" : "🔊";
	muteBtn.setAttribute("aria-pressed", muted);
});

// Browsers block autoplay until a user gesture — start bg music on first interaction
document.addEventListener(
	"click",
	() => {
		startBgMusic();
	},
	{ once: true }
);


let isMuted = false;

const sfx = {
	flip: new Audio("./assets/flip.mp3"),
	wrong: new Audio("./assets/wrong.mp3"),
	correct: new Audio("./assets/correct.mp3"),
	shuffle: new Audio("./assets/shuffle.mp3"),
	complete: new Audio("./assets/complete.mp3")
};

const bgMusic = new Audio("./assets/bgmusic.mp3");
bgMusic.loop = true;
bgMusic.volume = 1;

const playSfx = (name) => {
	if (isMuted) return;
	const sound = sfx[name];
	sound.currentTime = 0;
	sound.play().catch(() => {}); // swallow autoplay-block errors
};

const startBgMusic = () => {
	if (isMuted) return;
	bgMusic.play().catch(() => {});
};

const stopBgMusic = () => {
	bgMusic.pause();
	bgMusic.currentTime = 0;
};

const toggleMute = () => {
	isMuted = !isMuted;
	if (isMuted) {
		stopBgMusic();
	} else {
		startBgMusic();
	}
	return isMuted;
};


setupGame();