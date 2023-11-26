const menuContainer = document.querySelector("#menu");
const gameContainer = document.querySelector("#gameContainer");
const allCards = document.querySelectorAll(".card");
const startButton = document.querySelector("#start");
const allimg = document.querySelectorAll("img");
const counter = document.querySelector("#cardCounter");
const container = document.querySelectorAll("#continer");
let cardlength = allCards.length;
let card1 = null;
let card2 = null;
let cardCount = 0;
let notclicked = false;
let currentCount = 0;
let lowScore = localStorage.getItem("lowScore");

if (lowScore) {
	const bestScore = document.querySelector("h2");
	bestScore.innerText = `Your HighScore is ${lowScore}`;
}
startButton.addEventListener("click", GameStarts);

for (let card of allCards) {
	card.addEventListener("click", handleCardClick);
}

function GameStarts(event) {
	menuContainer.classList.add("playing");
	let imgArr = [];
	for (let i = 1; i <= cardlength / 2; i++) {
		imgArr.push(i.toString());
	}
	imgArr = shuffle(imgArr.concat(imgArr));

	for (let i = 0; i < imgArr.length; i++) {
		path = `gifs/${imgArr[i]}.gif`;
		allimg[i].src = path;
	}
}

function shuffle(arr) {
	let newArr = arr;
	let len = newArr.length;
	for (let currentIndex = len - 1; currentIndex > 0; currentIndex--) {
		let randonum = Math.floor(Math.random() * (currentIndex + 1));
		let temp = newArr[currentIndex];
		newArr[currentIndex] = newArr[randonum];
		newArr[randonum] = temp;
	}
	return newArr;
}

function handleCardClick(event) {
	if (notclicked) return;
	if (event.target.classList.contains("flipped")) return;
	if (event.target.tagName === "IMG") return;
	if (event.target.id === "cardCounter") return;
	cardCount += 1;
	counter.innerHTML = cardCount;
	let currentCard = event.target.parentElement;

	if (!card1 || !card2) {
		currentCard.classList.add("flipped");
		card1 = card1 || currentCard;
		card2 = card1 === currentCard ? null : currentCard;
	}
	if (card1 && card2) {
		notclicked = true;
		let name1 = card1.children[1].children[0].src;
		let name2 = card2.children[1].children[0].src;

		if (name1 === name2) {
			notclicked = false;
			card1 = null;
			card2 = null;
			currentCount += 2;
			if (currentCount === allimg.length) {
				alert("You Win");
				gameOver();
			}
		} else {
			setTimeout(function () {
				notclicked = false;
				card1.classList.remove("flipped");
				card2.classList.remove("flipped");
				card1 = null;
				card2 = null;
			}, 1000);
		}
	}
	function gameOver() {
		document.body.style.backgroundColor = "rgba(76, 175, 80, 0.3)";
		const finaladd = document.querySelector("#replay");
		finaladd.children[0].innerText = `Your Score is ${cardCount}`;
		if (cardCount < lowScore || !lowScore) {
			finaladd.children[1].innerText = `This is your current Highest Score`;
			localStorage.setItem("lowScore", cardCount);
		}
		finaladd.children[2].innerHTML = `<button onclick="location.href='index.html'" type="button">Replay</button>`;
	}
}
