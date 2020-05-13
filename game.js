const TILE_SIZE = 25;

let FIELD = [
  '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0',
  '0,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,0',
  '0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,3,0,0,0',
  '0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0',
  '0,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0',
  '0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0',
  '0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0',
  '0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0',
  '0,0,0,0,0,0,1,1,0,0,1,0,0,1,1,0,0,0,0,0',
  '0,1,1,1,1,1,1,1,0,4,1,4,0,1,1,1,1,3,1,0',
  '0,1,1,1,1,3,1,1,0,4,1,4,0,1,1,1,1,1,1,0',
  '0,0,0,0,0,0,1,1,0,1,0,0,0,1,1,0,0,0,0,0',
  '0,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0',
  '0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0',
  '0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0',
  '0,1,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,0',
  '0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0',
  '0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0',
  '0,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,3,1,0',
  '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0',
];


function setup() {

  createCanvas(500, 500);

  for (let i = 0; i < 400; i++) {
    field.push(new Tile(i % 20, Math.floor(i / 20), random(TYPES)));
  }

  field = generateField();
}

function draw() {
  background(51);

  for (let i = 0; i < field.length; i++) {

    if (field[i].intact) {

      if (field[i].type != 'GHOST' && field[i].type != 'PACMAN') {
        field[i].draw();
      }
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

  handleUserInput();
}

function handleUserInput() {
  if (keyIsDown(UP_ARROW)) {
    pacman.move(0, -1, true);
  } else if (keyIsDown(DOWN_ARROW)) {
    pacman.move(0, 1, true);
  } else if (keyIsDown(LEFT_ARROW)) {
    pacman.move(-1, 0, true);
  } else if (keyIsDown(RIGHT_ARROW)) {
    pacman.move(1, 0, true);
  }
}

function generateField() {
  const field = [];
  let gId = 0;

  for (let i = 0; i < FIELD.length; i++) {

    let row = FIELD[i].split(',');
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
          f.push(new Tile(j, i, 'OPEN'));
          break;

        case 'GHOST':
          ghosts.push(new Tile(j, i, type, gId % 2));
          f.push(new Tile(j, i, 'OPEN'));
          gId++;
          break;
      }

    }
  }

  return field;
}