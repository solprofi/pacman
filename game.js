let field = [];
const ghosts = [];

let pacman;
let score;
let endScore;

function init() {
  score = 0;
  field = generateField();
}

function setup() {
  createCanvas(750, 785);

  init();
}

function draw() {
  background(51);

  for (let i = 0; i < field.length; i++) {
    if (field[i].isIntact && field[i].type != 'GHOST' && field[i].type != 'PACMAN') {
      field[i].draw();
    }
  }

  for (let i = 0; i < ghosts.length; i++) {
    ghosts[i].update();
    ghosts[i].draw();
  }

  pacman.update();
  pacman.draw();

  noStroke();
  fill(255);
  textSize(30);
  textAlign(LEFT);
  text(score, 5, height - 5);

  handlePacman();
}

function handlePacman() {
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    pacman.move(0, -1, true);
  } else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    pacman.move(0, 1, true);
  } else if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    pacman.move(-1, 0, true);
  } else if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    pacman.move(1, 0, true);
  }
}

function endGame(won) {
  textSize(60);
  textAlign(CENTER);
  fill(255);
  stroke(0);
  strokeWeight(5);
  if (won) {
    text('You win!', width / 2, height / 2);

    textSize(30);
    text('Prepare for the next level', width / 2, height / 2 + 50);

    setTimeout(() => {
      init();
    }, 3000);
  } else {
    text('You lose!', width / 2, height / 2);
    textSize(30);
    text('Refresh the page to restart', width / 2, height / 2 + 50);
    noLoop();

  }


}

function generateField() {
  let field = [];

  let gId = 0;
  for (let i = 0; i < FIELD.length; i++) {

    const row = FIELD[i].split(',');
    for (let j = 0; j < row.length; j++) {
      const type = TYPES[row[j]];
      const tile = new Tile(j, i, type, -1);

      switch (type) {
        case 'BARRIER':
          field.push(tile);
          break;

        case 'CHERRY':
          endScore += 10;
          field.push(tile);
          break;

        case 'BISCUIT':
          endScore++;
          field.push(tile);
          break;

        case 'PACMAN':
          pacman = tile;
          field.push(new Tile(j, i, 'OPEN'));
          break;

        case 'GHOST':
          ghosts.push(new Tile(j, i, type, gId % 2));
          field.push(new Tile(j, i, 'OPEN'));
          gId++;
          break;
      }
    }
  }

  return field;
}