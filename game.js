const TILE_SIZE = 25;

const field = [];

function setup() {

  createCanvas(500, 500);

  for (let i = 0; i < 400; i++) {
    field.push(new Tile(i % 20, Math.floor(i / 20), random(TYPES)));
  }
}

function draw() {
  background(51);

  for (i = 0; i < field.length; i++) {
    field[i].draw();
  }
}