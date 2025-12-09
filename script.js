console.log("Script loaded");

const symbols = [
    "🍒", "🍒","🍒","🍒","🍒","🍒","🍒","🍒","🍒", "🍒","🍒","🍒","🍒","🍒","🍒","🍒",
    "🍋", "🍋", "🍋", "🍋","🍋","🍋","🍋", "🍋", "🍋", "🍋","🍋","🍋",
    "🍉", "🍉", "🍉", "🍉","🍉","🍉", "🍉", "🍉", "🍉","🍉",
    "⭐", "⭐", "⭐", "⭐", "⭐", "⭐", 
    "7","7", "7","7","7","7", "7","7",
    "💎","💎",
    "🎃"
];

const img = document.getElementById("rest-button");
const scoreDisplay = document.getElementById("score-display");
let score = 10; 


const spinSound = new Audio("elements/zelda-chest-opening-and-item-catch.mp3");       
const noWinSound = new Audio("elements/wrong-answer-sound-effect.mp3");      
const twoKindSound = new Audio("elements/money-soundfx.mp3"); 
const threeKindSound = new Audio("elements/money_2.mp3"); 
const tripleDiamondsSound = new Audio("elements/roblox-old-winning-sound-effect.mp3"); 

img.addEventListener("mouseover", () => {
  img.src = "elements/Button_hover.png";
});

img.addEventListener("mouseout", () => {
  img.src = "elements/button_rest.png";
});

function randomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function spinReel(reel, duration = 1000, interval = 100) {
  return new Promise((resolve) => {
    const startTime = Date.now();

    const animation = setInterval(() => {
      reel.textContent = randomSymbol();

      if (Date.now() - startTime >= duration) {
        clearInterval(animation);
        reel.textContent = randomSymbol(); 
        resolve();
      }
    }, interval);
  });
}

function calculateScore(reelSymbols) {
 
  if (score <= 0) return;
  score -= 2;

  const [r1, r2, r3] = reelSymbols;
  let winType = "none"; 

  if (reelSymbols.includes("🎃")) {
    window.open("https://snezic98.github.io/Assignment-2/index.html", "_blank");
    }

  if (r1 === r2 && r2 === r3) {
    switch (r1) {
      case "🍒": score += 6; winType = "three"; break;
      case "🍋": score += 30; winType = "three"; break;
      case "🍉": score += 75; winType = "three"; break;
      case "⭐": score += 180; winType = "three"; break;
      case "7":   score += 120; winType = "three"; break;
      case "💎": score += 450; winType = "tripleDiamond"; break;
    }
  }

  else if (r1 === r2 || r2 === r3) {
    const pairSymbol = r1 === r2 ? r1 : r2 === r3 ? r2 : r1;
    switch (pairSymbol) {
      case "🍒": score += 2; winType = "two"; break;
      case "🍋": score += 10; winType = "two"; break;
      case "🍉": score += 25; winType = "two"; break;
      case "⭐": score += 60; winType = "two"; break;
      case "7":   score += 40; winType = "two"; break;
      case "💎": score += 150; winType = "two"; break;
    }
  }


 


  scoreDisplay.textContent = `Your Score: ${score}🪙`;

  if(score <= 0) {
    scoreDisplay.style.color = "red";
    } else { 
        scoreDisplay.style.color = "white";
    }


  if (winType === "none") noWinSound.play();
  else if (winType === "two") twoKindSound.play();
  else if (winType === "three") threeKindSound.play();
  else if (winType === "tripleDiamond") tripleDiamondsSound.play();
}

async function spinAnimation() {
  if (score <= 0) {
    alert("You have no coins left!");
    return;
  }


  spinSound.loop=true;
  spinSound.currentTime = 3;
  spinSound.play();

  const reels = [
    document.getElementById("reel1"),
    document.getElementById("reel2"),
    document.getElementById("reel3")
  ];

  await Promise.all([
    spinReel(reels[0], 1200, 100),
    spinReel(reels[1], 2200, 100),
    spinReel(reels[2], 4200, 100)
  ]);
 
    spinSound.pause();
    spinSound.currentTime = 3;


  const finalSymbols = reels.map(r => r.textContent);
  calculateScore(finalSymbols);
}

img.onclick = function () {

  img.src = "elements/Button_pressed.png";

  setTimeout(() => {
    if (img.matches(":hover")) {
      img.src = "elements/Button_hover.png";
    } else {
      img.src = "elements/button_rest.png";
    }
  }, 100);

  console.log("PNG clicked!");
  spinAnimation();
};

const preload1 = new Image();
preload1.src = "elements/slot_machine_1.png";

const preload2 = new Image();
preload2.src = "elements/slot_machine_2.png";

let toggle = false;

setTimeout(() => {
  setInterval(() => {
    document.body.style.backgroundImage =
      `url(${toggle ? preload1.src : preload2.src})`;
    toggle = !toggle;
  }, 100);
}, 200);
