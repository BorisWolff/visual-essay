var inc = 0.1; // TODO can be dependent on input 
                // TODO noiseDetail(lod, falloff) both can be dependent on input
var scl = 5;
var cols, rows;
var zoff = 0;
var particles = [];
var flowfield;
var newMax = 2;

var font;
var button;
var toText = false;

var fr;

function preload() {
  font = loadFont('SpaceMono-BoldItalic.ttf');
}

function setup() {
  createCanvas(800, 400);
  cols = floor(width/scl);
  rows = floor(height/scl);
  fr = createP('');

  flowfield = new Array(cols * rows);

  var points1 = font.textToPoints('THE CREATION OF TWO-DIMENSIONAL', 50, 50, 30, {
    sampleFactor: 0.6
  });

  var points2 = font.textToPoints('SYNTHETIC      --////', 30, 140, 100, {
    sampleFactor: 0.6
  });

   var points3 = font.textToPoints('IMAGES       --////', 50, 230, 100, {
    sampleFactor: 0.6
  });

    var points4 = font.textToPoints('BY MEANS OF MATHEMATICAL MODELLING', 50, 270, 30, {
    sampleFactor: 0.6
  });

//     var points5 = font.textToPoints('(*^_^*) ', 50, 250, 80, {
//    sampleFactor: 0.5
//  });


  var points = points1.concat(points2).concat(points3).concat(points4);//.concat(points5);

  console.log(points.length);

  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var particle = new Particle();
    particle.setTarget(pt.x, pt.y);
    particles.push(particle);
  }


  button = createButton('PRESS HERE');
  button.mousePressed(function togleText() {
    if (toText) {
      for (var i = 0; i < particles.length; i++) {
        particles[i].setRandomVel();
      }
    }
    toText = !toText;
  });

  background(0);
}


function draw() {
  background(0, 3.5);       // snelheid verdwijnen achtergrond

  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * PI; //TODO * 2 can also be dependent on input
      var v = p5.Vector.fromAngle(angle);
      v.setMag(0.5); // TODO can be dependent on input
      flowfield[index] = v;

      //push();
      //stroke(0, 50);
      //translate(x * scl, y * scl);
      //rotate(v.heading());
      //strokeWeight(1);
      //line(0, 0, scl, 0);
      //stroke(0, 0, 255);
      ////point(scl, 0)
      //pop();
      
      xoff += inc;
    }
    yoff += inc;

  }
  zoff += 0.01

  if (toText) {
    //background(255, 50);
    for (var i = 0; i < particles.length; i++) {
      particles[i].setR(0);
      particles[i].behaviors();
      particles[i].update();
      particles[i].edges();
      particles[i].show();
      particles[i].setMax(newMax);
    }
  } else {
    for (var i = 0; i < particles.length; i++) {
      particles[i].setR(255);
      particles[i].follow(flowfield);
      particles[i].update();
      particles[i].edges();
      particles[i].show();
      particles[i].setMax(newMax);
    }
  }

 // fr.html(floor(frameRate()));
 fr.html('PRESS CNTRL + SHIFT + I - SOURCES - SKETCH.JS - SCROLL')
}

// VISUAL ESSAY DRAFT Boris Wolff 1001795

// For my visual essay I want to create synthetical images and
// give the viewer a feeling of how we might be communicating within the near future. 
// In my written essay I mention the term synthetic image, which is 
// referring to Vilém FLusser his interview where he claims:

// ‘’Numbers become digital codes, digital codes are being transcoded
// into synthetic images. Communicating concepts 
// nowadays will only work with synthetic images. But people don’t 
// really yet know how to handle modern apparatus. ‘’

// So I dove into the coding and tried achieving what he claimed to be
// to hard to understand for everyone. What I want to achieve is
// that you have a constantly changing synthetic image in front of you 
// that you could interrupt by pressing a certain botton,
// causing the image to change form and direction and telling you a message.

//   AESTETHIC REFERENCE: Leonardo Scarin
//   Instagram: ScarsCarin

