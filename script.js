const bricks = document.querySelectorAll('.brick');
const gameArea = document.querySelector("#column-view");
const replayButton = document.querySelector('.button');
const targetColor = document.querySelector('#target-color');
const score = document.querySelector('#score-fist-char');
const chance = document.querySelector('#chance-fist-char');
const chancePlusMinus = document.querySelector('#score-second-char');
const instruction = document.querySelector('#instruction');
const gameOver = document.querySelector('#game-over');
let currentScore = 0;
let currentChance = 3;
let targetIndex;
let randomColorIndex = 0;
let usedColorInex =  [];
let usedColor =  [];
let colorName;
let plusSign ="+";
let minusSign = "-";
let realIndex;
const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown', 'gray'];


// function getRandomColor() {
//   const letters = '0123456789ABCDEF';
//   let color = '#';
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * letters.length)];
//   }
//   return color;
// }

function updateBoxColors() {
  randomColorIndex = Math.floor(Math.random() * colors.length)
  if (!usedColorInex.includes(randomColorIndex)){
    usedColorInex.push(randomColorIndex);
    usedColor.push(colors[randomColorIndex]);
    colorName = colors[randomColorIndex]
  }
  else{
    if (usedColorInex.length < colors.length)
    {
      updateBoxColors();
    }
  }
  return colorName;
}


function updateTargetColor() {
  targetIndex = Math.floor(Math.random() * colors.length);
  // targetColor.textContent = colors[targetIndex];
}

function updatebrickColors() {
  usedColorInex = [];
  usedColor = []; 
  bricks.forEach(brick => {
 
    brick.style.backgroundColor = updateBoxColors();
    brick.removeEventListener('click', handleClick);
    brick.addEventListener('click', handleClick);
  });

  targetColor.style.color = usedColor[targetIndex];
  targetColor.textContent = usedColor[targetIndex];
  realIndex = usedColor.indexOf(usedColor[targetIndex]);
  const targetbrick = bricks[realIndex];
  // targetbrick.style.backgroundColor = colors[targetIndex];

  targetbrick.addEventListener('click', handleClick);
}

function handleClick(event) {
   if (event.target === bricks[realIndex]) {
    currentScore++;
    chancePlusMinus.textContent = plusSign;
    chancePlusMinus.style.color = "green";
   }
   else{ 
        if(currentChance > 0){
            currentScore--;
            chancePlusMinus.textContent = minusSign;
            chancePlusMinus.style.color = "red";
            if (currentScore < 0){
                currentScore = 0;
            }
            currentChance--;
        }
   }
   score.textContent = currentScore;
   chance.textContent = currentChance;
   if(currentChance === 0){
        instruction.style.display = "none";
        gameArea.style.display = "none";
        replayButton.style.display = "block";
        gameOver.style.display = "block"; 
   }
  updateTargetColor();
  updatebrickColors();
}
updateTargetColor();
updatebrickColors();

setInterval(updatebrickColors, 5000);