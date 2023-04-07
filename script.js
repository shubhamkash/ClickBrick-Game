const bricks = document.querySelectorAll('.brick');
const targetColor = document.querySelector('#target-color');
const score = document.querySelector('#score-fist-char');
const chance = document.querySelector('#chance-fist-char');
const chancePlusMinus = document.querySelector('#score-second-char');
const instruction = document.querySelector('#instruction');
const gameOver = document.querySelector('#game-over');
let currentScore = 0;
let currentChance = 3;
let targetIndex;
let plusSign ="+";
let minusSign = "-";
const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown', 'gray'];

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}

function updateTargetColor() {
  targetIndex = Math.floor(Math.random() * colors.length);
  targetColor.textContent = colors[targetIndex];
}

function updatebrickColors() {
  bricks.forEach(brick => {
    brick.style.backgroundColor = getRandomColor();
    brick.removeEventListener('click', handleClick);
    brick.addEventListener('click', handleClick);
  });
  const targetbrick = bricks[targetIndex];
  targetbrick.style.backgroundColor = colors[targetIndex];
  targetColor.style.color = colors[targetIndex];
  targetbrick.addEventListener('click', handleClick);
}

function handleClick(event) {
   if (event.target === bricks[targetIndex]) {
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
        gameOver.style.display = "block"; 
   }
  updateTargetColor();
  updatebrickColors();
}
updateTargetColor();
updatebrickColors();

setInterval(updatebrickColors, 5000);