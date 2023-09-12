const balloonContainer = document.getElementById("balloon-container");

function random(num) {
  return Math.floor(Math.random() * num);
}

function getRandomStyles(balloons) {
  var r = random(255);
  var g = random(255);
  var b = random(255);
  var mt, ml, dur;

  do {
    mt = random(200)+100; 
    ml = random(50);
    dur = random(15)+10;
  } while (checkOverlap(balloons, mt, ml));

  return `
  background-color: rgba(${r},${g},${b},0.7);
  color: black; /* Text color is black */
  box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
  margin: ${mt}px 0 0 ${ml}px;
  animation: float ${dur}s ease-in infinite;
  `;
}

function checkOverlap(balloons, mt, ml) {
  for (const balloon of balloons) {
    const rect = balloon.getBoundingClientRect();
    const top = mt + rect.height + 20; 
    const left = ml + rect.width + 20;

    if (
      mt < top &&
      mt + 125 > rect.top &&
      ml < left &&
      ml + 105 > rect.left
    ) {
      return true; 
    }
  }
  return false;
}

function getRandomImageSrc() {
  const images = [
    "./3.png",
    "./3.png",
    "./3.png",
  ];
  const randomIndex = random(images.length);
  return images[randomIndex];
}

function createBalloon(num) {
  const balloons = [];
  for (var i = num; i > 0; i--) {
    var balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.cssText = getRandomStyles(balloons);


    var image = document.createElement("img");
    image.src = getRandomImageSrc();
    image.alt = "Balloon Image";
    image.style.width = "100%";
    image.style.height = "auto";


    var text = document.createElement("p");
    text.textContent = "noor";
    text.style.fontSize = "30px"; 
    text.style.textAlign = "center"; 
    text.style.marginTop = "5px";

    balloon.appendChild(image);
    balloon.appendChild(text);

    balloonContainer.append(balloon);
    balloons.push(balloon);
  }
}

function removeBalloons() {
  balloonContainer.style.opacity = 0;
  setTimeout(() => {
    balloonContainer.remove();
  }, 200);
}

window.addEventListener("load", () => {
  createBalloon(50);
});

window.addEventListener("click", () => {
  removeBalloons();
});
