const TILE_SIZE = 25;
const DIMENSIONS = 20;

const MOVEMENT_SPEED = 0.15;
const GHOST_SPEED_COEFFICIENT = 0.75;

const FIELD = [
  '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0',
  '0,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,0',
  '0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,3,0,0,0',
  '0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0',
  '0,1,1,3,1,4,1,1,1,1,1,1,1,1,1,4,1,1,1,0',
  '0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0',
  '0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0',
  '0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0',
  '0,0,0,0,0,0,1,1,0,0,1,0,0,1,1,0,0,0,0,0',
  '0,1,1,1,1,1,1,1,0,4,1,1,0,1,1,1,1,3,1,0',
  '0,1,1,1,1,3,1,1,0,1,1,4,0,1,1,1,1,1,1,0',
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

const TYPES = ['BARRIER', 'BISCUIT', 'OPEN', 'CHERRY', 'GHOST', 'PACMAN'];