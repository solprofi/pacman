//pacman mouth animation
let upperMouth = 1.85 // upper mouth radian
let lowerMouth = 0.2 // lower mouth radian
mouthSpeed = 0.01

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
      strokeWeight(3);
      stroke(0);
      fill('#2234c5');
      rect(this.x * TILE_SIZE, this.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      break;

    case 'BISCUIT':
      ellipseMode(CORNER);
      strokeWeight(2);
      stroke('#ddd');
      fill(255);
      ellipse(this.x * TILE_SIZE + TILE_SIZE * 2 / 5, this.y * TILE_SIZE + TILE_SIZE * 2 / 5, TILE_SIZE / 5);
      break;

    case 'CHERRY':
      ellipseMode(CORNER);
      stroke('#ff7878');
      strokeWeight(2);
      fill('#FF2222');
      ellipse(this.x * TILE_SIZE + TILE_SIZE / 4, this.y * TILE_SIZE + TILE_SIZE / 4, TILE_SIZE / 2);
      break;

    case 'GHOST':
      ellipseMode(CORNER);
      stroke('#fff');
      strokeWeight(1);
      fill('#000');
      ellipse(this.x * TILE_SIZE + TILE_SIZE / 4, this.y * TILE_SIZE + TILE_SIZE / 4, TILE_SIZE / 2);
      fill('#f00');
      strokeWeight(0);
      ellipse(this.x * TILE_SIZE + TILE_SIZE / 2 + 2, this.y * TILE_SIZE + TILE_SIZE / 3, 3, 3);
      ellipse(this.x * TILE_SIZE + TILE_SIZE / 2 - 5, this.y * TILE_SIZE + TILE_SIZE / 3, 3, 3);
      break;

    case 'PACMAN':
      fill(255, 255, 0);
      ellipse(this.x * TILE_SIZE, this.y * TILE_SIZE, TILE_SIZE);

      fill(30);
      if (upperMouth >= 2 || upperMouth <= 1.8) {
        mouthSpeed = mouthSpeed * (-1)
      }
      arc(
        this.x * TILE_SIZE + 13,
        this.y * TILE_SIZE + 7,
        TILE_SIZE / 3 * 2,
        TILE_SIZE / 3 * 2,
        (upperMouth += mouthSpeed) * PI,
        (lowerMouth -= mouthSpeed) * PI, PIE
      );

      ellipse(this.x * TILE_SIZE + TILE_SIZE / 2, this.y * TILE_SIZE + TILE_SIZE / 3, 5, 5);
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