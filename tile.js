function Tile(x, y, type, id) {
  this.x = x;
  this.y = y;
  this.type = type;

  this.dX = -1;
  this.dY = -1;
  this.isMoving = false;

  this.isIntact = true;

  this.movementSpeed = MOVEMENT_SPEED;

  this.id = id;
}

Tile.prototype.update = function () {
  if (!this.isIntact) {
    return;
  }

  if (this.isMoving) {
    this.x = lerp(this.x, this.dX, this.type === 'PACMAN' ? this.movementSpeed : this.movementSpeed * GHOST_SPEED_COEFFICIENT);
    this.y = lerp(this.y, this.dY, this.type === 'PACMAN' ? this.movementSpeed : this.movementSpeed * GHOST_SPEED_COEFFICIENT);

    if (Math.abs(this.x - this.dX) < 0.1 && Math.abs(this.y - this.dY) < 0.1) {
      this.x = this.dX;
      this.y = this.dY;

      this.isMoving = false;
    }
  }

  if (this.type === 'PACMAN') {
    const dTileX = Math.floor(this.x);
    const dTileY = Math.floor(this.y);

    const dTile = getTile(dTileX, dTileY);

    if (dTile.isIntact) {
      switch (dTile.type) {
        case 'BISCUIT':
          score++;
          dTile.isIntact = false;
          break;

        case 'CHERRY':
          score += 10;
          dTile.isIntact = false;
          break;
      }
    }

    if (score === endScore) {
      endGame(true);
    }

  } else if (this.type === 'GHOST') {
    if (Math.abs(pacman.x - this.x) < 0.3 && Math.abs(pacman.y - this.y) < 0.3) {
      endGame(false);
    }

    if (this.isMoving) {
      return;
    }

    const possibleMoves = [
      getTile(this.x - 1, this.y),
      getTile(this.x + 1, this.y),
      getTile(this.x, this.y - 1),
      getTile(this.x, this.y + 1),
    ];

    possibleMoves.sort(function (a, b) {
      const aD = dist(a.x, a.y, pacman.x, pacman.y);
      const bD = dist(b.x, b.y, pacman.x, pacman.y);

      return aD - bD;
    });

    if (this.id === 0) {
      for (let i = 0; i < possibleMoves.length; i++) {
        if (this.move(possibleMoves[i].x, possibleMoves[i].y, false)) {
          break;
        }
      }
    } else {
      const index = Math.floor(random(4));
      this.move(possibleMoves[index].x, possibleMoves[index].y, false);
    }
  }
};

Tile.prototype.draw = function () {
  switch (this.type) {
    case 'BARRIER':
      strokeWeight(5);
      stroke(0);
      fill('#0000FF');
      rect(this.x * TILE_SIZE, this.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      break;

    case 'BISCUIT':
      ellipseMode(CORNER);
      noStroke();
      fill(255);
      ellipse(this.x * TILE_SIZE + TILE_SIZE / 3, this.y * TILE_SIZE + TILE_SIZE / 3, TILE_SIZE / 3);
      break;

    case 'CHERRY':
      ellipseMode(CORNER);
      stroke(255);
      strokeWeight(2);
      fill('#FF2222');
      ellipse(this.x * TILE_SIZE + TILE_SIZE / 4, this.y * TILE_SIZE + TILE_SIZE / 4, TILE_SIZE / 2);
      break;

    case 'GHOST':
      fill('#FF00EE');
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
};

Tile.prototype.move = function (x, y, relative) {
  let dY, dX;

  if (relative) {
    dX = this.x + x;
    dY = this.y + y;
  } else {
    dX = x;
    dY = y;
  }

  if (this.isMoving) {
    return false;
  }

  const destinationTile = getTile(dX, dY);

  const type = destinationTile.type;

  if ((type === 'BARRIER' && this.type != 'BARRIER') || (type === 'GHOST' && this.type === 'GHOST')) {
    return false;
  }

  this.isMoving = true;
  this.dX = dX;
  this.dY = dY;

  return true;
};

function getTile(x, y) {
  return field[y * DIMENSIONS + x];
}