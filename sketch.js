// Create let and var for later function use
let hue = 0;
let img;
let value1 = 180;
let value2 = 190;
var cnv;
var c = [];
var l = 50;
var myColour;
var numFill = 500;

// Create image preload for later Brush2 function use
function preload() {
  img = loadImage("img/brush.png");
}

// Setup is used to define initial environment properties
function setup() {
  // CreateCanvas function tells the computer the canvas size
  cnv = createCanvas(windowWidth, windowHeight);
  // Hides the cursor from view
  noCursor();
  // Create mouseWheel for later mouseWheel function
  cnv.mouseWheel(mouseWheel);
  // Set up the background colour for the canvas
  background(5, 11, 74);
  // FuncIndex defines which button appears at the first start
  funcIndex = 3;
  // Set up the parameters in Brush1 function
  size = 25;
  spring = 0.5;
  splitNum = 10;
  friction = 0.5;
  x = y = vx = vy = v = r = 0;
  f = false;

  // Set up the interface and buttons on this canvas
  UI = createGraphics(width, height);
  buttons = [];
  for (let i = 0; i < 4; ++i) {
    buttons.push(
      txtButtonRect(
        "Brush" + (i + 1),
        18,
        height * 0.03 + i * height * 0.07,
        80,
        height * 0.05
      )
    );
  }
  buttons[funcIndex].isPush = true;

  // Set up the colours that Brush4 function will use later
  c[0] = color(127, 22, 201);
  c[1] = color(88, 22, 219);
  c[2] = color(52, 33, 219);
  c[3] = color(55, 67, 237);
  c[4] = color(65, 137, 232);
  c[5] = color(58, 175, 224);
  c[6] = color(119, 228, 247);
  c[7] = color(214, 249, 255);
  c[8] = color(232, 249, 252);
  c[9] = color(245, 253, 255);
  c[10] = color(207, 230, 250);
  c[11] = color(219, 222, 255);
  c[12] = color(209, 212, 255);
  c[13] = color(210, 196, 255);
  c[14] = color(155, 164, 250);
  c[15] = color(108, 96, 230);
  c[16] = color(152, 96, 230);
  c[17] = color(183, 96, 230);
  c[18] = color(230, 96, 121);

  // Defines which colour appears at the first start in Brush4 function
  myColour = c[0];
}

// The draw function continuously executes the lines of code contained inside its block until the program is stopped
function draw() {
  // The hue will change according to this line of code
  hue = (hue + 1) % 360;

  // To make every button's function work when press
  switch (funcIndex) {
    case 0:
      Brush1();
      break;
    case 1:
      Brush2();
      break;
    case 2:
      Brush3();
      break;
    case 3:
      Brush4();
      break;
    case 4:
  }

  buttons.forEach((button, i) => {
    button.draw();
  });

  // Make sure the buttons appear correctly on screen
  image(UI, 0, 0);
}

// Brush1 function starts when mouse is pressed. This function is inspired by another artist
function Brush1() {
  if (mouseIsPressed) {
    if (!f) {
      f = true;
      x = mouseX;
      y = mouseY;
    }

    vx += (mouseX - x) * spring;
    vy += (mouseY - y) * spring;
    vx *= friction;
    vy *= friction;

    v += sqrt(vx * vx + vy * vy) - v;
    v *= 0.6;

    oldR = r; // ADD
    r = size - v;

    for (let i = 0; i < splitNum; ++i) {
      // ADD
      oldX = x;
      oldY = y;
      x += vx / splitNum; // AMEND: vx -> vx/splitNum
      y += vy / splitNum; // AMEND: vy -> vy/splitNum
      oldR += (r - oldR) / splitNum; // ADD
      if (oldR < 1) {
        oldR = 1;
      } // AMEND: r -> oldR
      stroke(hue, value1, value2);
      strokeWeight(oldR); // AMEND: r -> oldR
      line(x, y, oldX, oldY);
    } // ADD
  } else if (nf) {
    vx = vy = 0;
    f = false;
  }
}

// Brush2 function starts when mouse is pressed. Those codes make sure the brush images will continuously appear and create continuous lines
function Brush2() {
  var destX = mouseX - pmouseX;
  var destY = mouseY - pmouseY;

  if (mouseIsPressed) {
    for (var i = 0; i < numFill; i++) {
      // Image's position and size

      image(
        img,
        pmouseX + (destX / numFill) * i,
        pmouseY + (destY / numFill) * i,
        size,
        size
      );     
    }
  }
}

// Brush3 function starts when mouse is pressed. The stroke changes randomly, the line's position and space change randomly
function Brush3() {
  if (mouseIsPressed) {
    // Set the color and brush style
    stroke(hue, value1, value2);
    strokeWeight(random(10, size));
    const width = 8;

    // Draw a randomly chaging line
    line(
      random(mouseX - width, mouseX + width),
      random(mouseY - width, mouseY + width),
      random(mouseX + width, mouseX - width),
      random(mouseY + width, mouseY - width)
    );
  }
}

// Brush4 function starts when mouse is pressed. Users can click on different colour squares to choose different colours
function Brush4() {
  //Draw palette squares
  fill(c[0]);
  rect(0, height - l, l, l);

  fill(c[1]);
  rect(l * 1, height - l, l, l);

  fill(c[2]);
  rect(l * 2, height - l, l, l);

  fill(c[3]);
  rect(l * 3, height - l, l, l);

  fill(c[4]);
  rect(l * 4, height - l, l, l);

  fill(c[5]);
  rect(l * 5, height - l, l, l);

  fill(c[6]);
  rect(l * 6, height - l, l, l);

  fill(c[7]);
  rect(l * 7, height - l, l, l);

  fill(c[8]);
  rect(l * 8, height - l, l, l);

  fill(c[9]);
  rect(l * 9, height - l, l, l);

  fill(c[10]);
  rect(l * 10, height - l, l, l);

  fill(c[11]);
  rect(l * 11, height - l, l, l);

  fill(c[12]);
  rect(l * 12, height - l, l, l);

  fill(c[13]);
  rect(l * 13, height - l, l, l);

  fill(c[14]);
  rect(l * 14, height - l, l, l);

  fill(c[15]);
  rect(l * 15, height - l, l, l);

  fill(c[16]);
  rect(l * 16, height - l, l, l);

  fill(c[17]);
  rect(l * 17, height - l, l, l);

  fill(c[18]);
  rect(l * 18, height - l, l, l);

  if (mouseIsPressed) {
    // To define the area of 'mouse click and colour change' effect
    if (mouseY > height - l) {
      if (mouseX < l * 19) {
        myColour = get(mouseX, mouseY);
      }
    }

    // The colour of rect at the start and the style of rect
    fill(myColour);
    noStroke();
    rect(mouseX, mouseY, size, size);
  }
}

// The effects that will appear when some keys are pressed
function keyPressed() {
  if (key == "1") background(212, 232, 252);
  if (key == "2") (value1=121); (value2=41); (img = loadImage("img/brush2.png"));
  if (key == "9") fullscreen(true);
  if (key == "0") resetSketch(true);
}

// Moving the mouseWheel to change the brush size
function mouseWheel(event) {
  if (event.deltaY > 0) {
    size = size + 2;
  } else {
    size = size - 2;
  }
}

// The buttons functions will work when mouse is pressed. The buttons are inspired by the brush1 artist as well
function mousePressed() {
  print("mousePressed()");
  let index = -1;
  buttons.forEach((button, i) => {
    button = buttons[i];
    if (button.isHit()) {
      index = i;
    }
  });

  if (index >= 0) {
    buttons[funcIndex].isPush = false;
    funcIndex = index;
    buttons[funcIndex].isPush = true;
    resetSketch();
  }
}

// When the mouse is dragged, the print will appear
function mouseDragged() {
  mouse_drag = true;
  print("mouseDragged()");
}

// When release the mouse, the print will appear as well
function mouseReleased() {
  mouse_drag = false;
  print("mouseReleased()");
}

// To make the canvas responsive
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(5, 11, 74);
}

// When reset this sketch, the background will change back to the original background, the canvas will change back to the original size, the colour, size and image will change back to the original as well
function resetSketch() {
  resizeCanvas(windowWidth, windowHeight);
  background(5, 11, 74);
  value1=180;
  value2=190;
  size = 25;
  img = loadImage("img/brush.png");
}

/* -----UI----- */

collisionRect = (x, y, w, h, l = 2) => ({
  x,
  y,
  w,
  h,
  lineSize: 0,
  isPush: false,
  isHit: function () {
    return mouseIsPressed && this.collision();
  },
  _draw: function () {
    UI.strokeWeight(this.lineSize);
    UI.fill(this.isPush ? 50 : 165, 116, 232);
    UI.rect(this.x + this.lineSize, this.y + this.lineSize, this.w, this.h, 10);
  },
  draw: function () {
    this._draw();
  },
  collision: function () {
    return (
      mouseX > this.x &&
      mouseX < this.x + this.w &&
      mouseY > this.y &&
      mouseY < this.y + this.h
    );
  },
});

txtButtonRect = (txt, x, y, w, h) =>
  Object.assign(collisionRect(x, y, w, h), {
    txt,
    draw: function () {
      this._draw();
      UI.fill(5, 11, 74);
      UI.textAlign(LEFT, CENTER);
      UI.textSize(this.h * 0.5);
      UI.text(this.txt, this.x + 10, this.y + this.h / 2 + this.lineSize);
    },
  });

