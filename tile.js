const TYPES = ['CHERRY', 'OPEN', 'BISCUIT', 'BARRIER', 'GHOST', 'PACMAN'];

function Tile(x, y, type) {
  this.x = x;
  this.y = y;
  this.type = type;
}

Tile.prototype.draw = function () {
  switch (this.type) {
    case 'BARRIER':
      stroke(0);
      strokeWeight(5);
      fill('#0000FF');
      rect(this.x * TILE_SIZE, this.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      break;

    case 'CHERRY':
      ellipseMode(CORNER);
      strokeWeight(2);
      stroke(255);
      fill('#FF2222');
      ellipse(this.x * TILE_SIZE + TILE_SIZE / 4, this.y * TILE_SIZE + TILE_SIZE / 4, TILE_SIZE / 2);
      break;

    case 'BISCUIT':
      ellipseMode(CORNER);
      noStroke();
      fill(0);
      ellipse(this.x * TILE_SIZE + TILE_SIZE / 3, this.y * TILE_SIZE + TILE_SIZE / 3, TILE_SIZE / 3);
      break;

    case 'GHOST':
      fill('#FF00DD');
      stroke(0);
      strokeWeight(1);
      beginShape();
      vertex(this.x * TILE_SIZE + TILE_SIZE / 2, this.y * TILE_SIZE + TILE_SIZE / 4);
      vertex(this.x * TILE_SIZE + TILE_SIZE / 4, this.y * TILE_SIZE + (TILE_SIZE / 4 * 3));
      vertex(this.x * TILE_SIZE + (TILE_SIZE / 4 * 3), this.y * TILE_SIZE + (TILE_SIZE / 4 * 3));
      endShape(CLOSE);
      break;

    case 'PACMAN':
      ellipseMode(CORNER);
      stroke('#FFFF00');
      strokeWeight(5);
      fill('#FFFF33');
      ellipse(this.x * TILE_SIZE + TILE_SIZE / 4, this.y * TILE_SIZE + TILE_SIZE / 4, TILE_SIZE / 2);
      break;
  }
}