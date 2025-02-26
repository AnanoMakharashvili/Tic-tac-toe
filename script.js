const buttonOne = document.getElementById("button-one");
const gameContainer = document.getElementById("game-container");
const firstPage = document.getElementById("first-page");
console.log(firstPage);

buttonOne.addEventListener("click", () => {
  gameContainer.style.display = "block";
  firstPage.style.display = "none";
});
