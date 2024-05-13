// Initialize Variables
let floor1, ballsGroup, trampoline, wallGroup, ceiling, panel, square1, trapped, player, killGroup;
let balls = [];
let walls = [];
// Set debug rules
let debug = {};
debug.on = false;
debug.x = 200;
debug.y = 800;
debug.zoom = 0.5;

// Setup functio 
function setup() {
  // Create canvas and set gravity
  canvas = createCanvas(400, 400);
  canvas.parent('canvas-div');
  world.gravity.y = 10;
  // Create wall and kill wall group 
  wallGroup = new Group();
  wallGroup.color = 'blue';
  wallGroup.collider = 's';
  killGroup = new Group();
  killGroup.color = 'red';
  killGroup.collider = 's';
  // Set walls and kill walls

  walls.push(new wallGroup.Sprite(600, 0, 1200, 5));// 0 (arrays start with 0)
  walls.push(new wallGroup.Sprite(550, 400, 1200, 5));
  walls.push(new wallGroup.Sprite(0, 600, 5, 1200));
  walls.push(new wallGroup.Sprite(400, 150, 5, 400));
  walls.push(new wallGroup.Sprite(364, 350, 5, 100));
  walls.push(new wallGroup.Sprite(800, 235, 5, 325));// 5
  walls.push(new wallGroup.Sprite(1200, 600, 5, 1200));
  walls.push(new wallGroup.Sprite(550, 1200, 1200, 5));
  walls.push(new wallGroup.Sprite(650, 350, 300, 5));
  walls.push(new wallGroup.Sprite(700, 250, 200, 5));
  walls.push(new wallGroup.Sprite(688, 130, [50, 72, 50, -72, 50, 72, 5], 's'));// 10
  //Level 3
  walls.push(new wallGroup.Sprite(900, 175, 5, 350));
  walls.push(new wallGroup.Sprite(1020, 225, 5, 350));
  //Level 3 Platforms
  walls.push(new wallGroup.Sprite(900, 150, 90, 5));
  walls.push(new wallGroup.Sprite(900, 250, 90, 5));
  walls.push(new wallGroup.Sprite(900, 350, 90, 5));//15
  walls.push(new wallGroup.Sprite(1070, 100, 170, 5));
  walls.push(new wallGroup.Sprite(1020, 200, 90, 5));
  walls.push(new wallGroup.Sprite(1020, 300, 90, 5));
  walls.push(new wallGroup.Sprite(960, 50, 125, 5));
  walls[19].rotation = -45; // Rotate wall 19 by -45 degrees
  //Level 4
  walls.push(new wallGroup.Sprite(1000, 650, 5, 350));//20
  walls.push(new wallGroup.Sprite(1100, 550, 100, 5));
  walls.push(new wallGroup.Sprite(900, 550, 180, 5));
  walls.push(new wallGroup.Sprite(900, 650, 180, 5));
  walls.push(new wallGroup.Sprite(900, 720, 180, 5));
  walls.push(new wallGroup.Sprite(800, 550, 5, 350));//25
  //Level 5
  walls.push(new wallGroup.Sprite(600, 750, 50, 5));
  walls.push(new wallGroup.Sprite(700, 750, 50, 5));
  walls.push(new wallGroup.Sprite(500, 750, 50, 5));
  walls.push(new killGroup.Sprite(600, 770, 250, 5)); // First kill wall
  //Level 6
  walls.push(new killGroup.Sprite(125, 600, 50, 320));//30
  walls.push(new killGroup.Sprite(175, 600, 50, 320));
  walls.push(new killGroup.Sprite(225, 600, 50, 320));
  walls.push(new killGroup.Sprite(275, 600, 50, 320));
  walls.push(new killGroup.Sprite(325, 600, 50, 320));
  walls.push(new wallGroup.Sprite(650, 800, 1200, 5));//35
  // Create trampoline from level 1
  trampoline = new Sprite(300, 360, 100, 5, 'static');
  trampoline.color = 'orange';
  trampoline.rotation = -45;
  trampoline.bounciness = 5;
  // Create extra balls in level 1
  ballsGroup = new Group();
  ballsGroup.y = 50;
  ballsGroup.diameter = 20;
  balls.push(new ballsGroup.Sprite());
  balls[0].color = 'purple';
  balls[0].x = 50;
  balls.push(new ballsGroup.Sprite());
  balls[1].color = 'purple';
  balls[1].x = 100;
  balls[1].mass = 10;
  // Initialize player sprite with debug positioning
  if (debug.on) {
    player = new Sprite(debug.x, debug.y, 30);
  } else {
    player = new Sprite(150, 50, 30);
  }
  player.color = 'green';
  player.text = 'YOU!';
  player.mass = 3;
  player.rotationDrag = 5;
  //Panel
  panel = new Sprite(200, 200, 100, 5, 'static');
  panel.color = 'blue';
  panel.bounciness = 0;
  //square1 (not really a square)
  square1 = new Sprite(300, 100, [50, 72, 50, -72, 50, 72, 5], 's');
  square1.color = 230;
  square1.text = 'Look Closer!';
  //Trapped
  trapped = new Sprite(325, 75, 10, 'pentagon');
  trapped.color = 'blue';

}

function draw() {
  // Make walls spin
  walls[22].rotation++;
  walls[23].rotation--;
  walls[24].rotation++;
  // Move level 6 walls up and down
  walls[30].y = 590 + cos(frameCount * 1) * 20;
  walls[31].y = 590 - cos(frameCount * 1) * 20;
  walls[32].y = 590 + cos(frameCount * 1) * 20;
  walls[33].y = 590 - cos(frameCount * 1) * 20;
  walls[34].y = 590 + cos(frameCount * 1) * 20;
  // Set background color
  background(220);
  // Limit ball speed
  if (balls[1].speed >= 20) {
    balls[1].speed = 20;
  }
  if (balls[0].speed >= 20) {
    balls[0].speed = 20;
  }
  panel.rotation++;
  square1.rotation--;
  walls[10].rotation--;
  //Add Gravity to Panel
  ballsGroup.attractTo(panel, 5);
  // Key controle
  if (kb.pressing('right') > 1) {
    // To the right
    player.applyTorque(5);
    console.log('right');
  } else if (kb.pressing('left') > 1) {
    // To the left
    player.applyTorque(-5);
    console.log('left');
  }
  if (kb.presses('up') && (player.colliding(wallGroup) > 1 || player.colliding(panel) > 1 || player.colliding(square1) > 1)) {
    // Jump
    player.velocity.y = -7;
  }
  // Debug camera positiom
  if (debug.on) {
    camera.x = debug.x;
    camera.y = debug.y;
    camera.zoomTo(debug.zoom);
    //console.log(mouse.x, mouse.y);
  } else {
    // Camera position
    camera.x = floor(player.x / 400) * 400 + 200;
    camera.y = floor(player.y / 400) * 400 + 200;
  }
  // Kill group and respawn
  if (player.colliding(killGroup)) {
    if (floor(player.y / 400) / 2 == floor(floor(player.y / 400) / 2)) {
      player.x = 50;
    } else {
      player.x = 1150;
    }
  }
}