var canvas;
var c;

document.addEventListener("DOMContentLoaded", function(event) {  
  document.getElementsByClassName("modal1")[0].style.display="none";
  canvas = document.getElementById("gameBoard");
  c = canvas.getContext('2d');
  play();
});

function play() {
  var waiting;
  var timeText="";
var burstSound=new Audio("burst.mp3");
var gameOverSound=new Audio("error.mp3");
var coloured=localStorage.getItem("colored");
var set=false;
var liquidLuck=2;
var slowDown=0;
var gameOver=false;
var multiplier=1;

document.getElementById("pausing").style.display="block";
let ballImage = new Image();
ballImage.src = 'images/bubble.png';
c.clearRect(0, 0, canvas.width, canvas.height);
let gauntletImage=new Image();
gauntletImage.src='images/gauntlet.png';
let coinImage = new Image();
coinImage.src = 'https://www.cat-in-web.ru/wp-content/uploads/coin-sprite-animation.png';
var t=true;
var paused=false;
var flagging = 0;
var score = 0;
var accuracy=0;
var total=0;
var getDist = function(xy1,xy2){
  return Math.sqrt(Math.pow(xy1.x-xy2.x,2)+Math.pow(xy1.y-xy2.y,2));
}
canvas.width = document.body.clientWidth;
      canvas.height = document.body.clientHeight;
var radiusBubble=Number(localStorage.getItem("radiusOfBubbles"));
var count = canvas.height;
  var bubbles = [];
  var bubbleCount = 10;
  var bubbleSpeed = -4;
  var bubbleSpeedX = 2;
  var popLines = 6;
  var popDistance = 40;
  var mouseOffset = {
    x: 0,
    y: 0
  }
  var factor=((localStorage.getItem("speedFactor")=="true")?1.3:0.65);
  var radiusSpeed=((localStorage.getItem("radiusGrow")=="true")?0.1:0.05);
  if(factor==1) {
    multiplier*=2;
  }
  if(radiusSpeed==0.1) {
    multiplier*=2;
  }
  
  bubbleSpeed*=factor;
  bubbleSpeedX*=factor;
  
  class Sprite {
    constructor(options, scale, locations=[]) {
        this.ctx = options.ctx;

        this.image = options.image;

        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = options.ticksPerFrame || 0;
        this.numberOfFrames = options.numberOfFrames || 1;

        this.width = options.width;
        this.height = options.height;
        this.bubble=options.bubble;
        this.locations=locations;
        this.scale=scale;
    }

    update() {
        this.tickCount++;

        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            if (this.frameIndex < this.numberOfFrames - 1) {
                this.frameIndex++;
            } else {
                this.frameIndex = 0;
            }
        }
    }

    render() {
        var total=0;
      if(this.locations.length!=0) {
        for(var mu=0;mu<=this.frameIndex; mu++) {
          total+=this.locations[mu];
        }
      }
      var startpoint=(this.locations.length!=0)?total:(this.frameIndex * this.width / this.numberOfFrames);
      var width=(this.locations.length!=0)?this.locations[this.frameIndex+1]:(this.width / this.numberOfFrames);
      var scale=(this.locations.length!=0)?this.scale*(this.locations[this.frameIndex+1]/this.height):this.scale;
      var scaleY=(this.locations.length!=0)?1:this.scale;
        this.ctx.drawImage(
            this.image,
            startpoint,
            0,
            width,
            this.height,
            this.bubble.position.x-(this.bubble.radius*scale),
            this.bubble.position.y-(this.bubble.radius*scaleY),
            2*(this.bubble.radius*scale),
            2*(this.bubble.radius*scaleY)
        )
    }
}
  var choose = function(){
    return arguments[Math.floor(arguments.length*Math.random())];
  };

  // --------------
  // Animation Loop
  // --------------
var tow,start,ko=6;
var alarmAudio;
var timing,interval=1000;
function settimer() {
  start=Date.now();
  alarmAudio=new Audio("alarm.mp3");
  timeText="00:06";
  alarmAudio.play();
  setTiming();
}

function setTiming() {
  alarmAudio=new Audio("alarm.mp3");
  if(paused) {
      interval=(Date.now()-start);
      interval=1000-interval%1000;
    }
  else {
  timing=setTimeout(function (){
    
      ko--;
      timeText="00:0"+ko;
      if(ko==-1) {
        var points=(Math.round((multiplier*score*accuracy)/100));
        
        var topScores=JSON.parse(localStorage.getItem("scores") || "[]");
        var q;
        for (q = 0; q < topScores.length; q++) {
          if(topScores[q]<points)
              break;
      }
      topScores.splice(q, 0, points);
      topScores=topScores.slice(0, 10);
      for(var i=topScores.length; i<10; ++i) {
          topScores[i]=0;
      }
      topScores=topScores.slice(0, 10);
      localStorage.setItem("scores", JSON.stringify(topScores));
        
        gameOverSound.play();
        t=false;
          gameOver=true;
          var W=canvas.width;
          var H=canvas.height;
          c.globalAlpha = 0.7;
          c.fillStyle = '#000';
          c.fillRect(0,0,W,H);
          c.globalAlpha = 1;
          c.textAlign = 'center';
          c.font = '60px Arial';
          c.fillStyle = '#000';
          c.strokeStyle = '#EEE';
          c.lineWidth = 2;
          c.fillText('TAP TO RESTART',W/2,H/2);
          c.strokeText('TAP TO RESTART',W/2,H/2);
          c.fillText('GAME OVER',W/2,H/2+60);
          c.strokeText('GAME OVER',W/2,H/2+60);
          
          document.getElementById("pausing").style.display="none";
          window.cancelAnimationFrame(tow);
      }
      else if(ko==0) {
        timeText="";
        interval=100;
        setTiming();
      }
      else {
        
        alarmAudio.play();
        setTiming();
      }
    },interval);
    interval=1000;
  }
    
}

function animate() {



    // ------------
    // Clear Canvas
    // ------------

    c.clearRect(0, 0, canvas.width, canvas.height);
    

    // ------------
    // Draw Bubbles
    // ------------
    
    c.beginPath();
    var totalArea = 0;
    for (var i = 0; i < bubbles.length; i++) {
      bubbles[i].radius+=radiusSpeed;
      // first num = distance between waves
      // second num = wave height
      // third num = move the center of the wave away from the edge
      bubbles[i].position.x = bubbles[i].xOff;
      bubbles[i].position.y = bubbles[i].count;
      for(var j =0;j<bubbles.length;++j) {
        if(bubbles[i]===bubbles[j])
          continue;
        var dist=getDist(bubbles[i].position, bubbles[j].position);
        
        if(dist<=(bubbles[i].radius+bubbles[j].radius)) {
          // console.log(i,j,dist, bubbles[i].radius, bubbles[j].radius)
          // console.log("has collided");
          resolveCollision(bubbles[i], bubbles[j]);
        }
      }
      if(bubbles[i].count <= bubbles[i].radius+5) {
        bubbles[i].velocity.y*=-1;
        // bubbles[i].count = canvas.height + bubbles[i].yOff;
          console.log(bubbles[i].hit)
          if(!bubbles[i].hit) {console.log(2, bubbles[i].hit);
            var tempBubble = new createBubble();
            bubbles.push(tempBubble);
            bubbles[i].hit=true;
          }
      } 
      else if(bubbles[i].count >= canvas.height-bubbles[i].radius && bubbles[i].velocity.y>0) {
        bubbles[i].velocity.y*=-1;
          
      }
      else if(bubbles[i].count >= 2*canvas.height-bubbles[i].radius) {
        bubbles[i].velocity.y*=-1;
          
      }
      if(bubbles[i].xOff <= bubbles[i].radius) {
        bubbles[i].velocity.x*=-1;
        // bubbles[i].count = canvas.height + bubbles[i].yOff;
      } 
      else if(bubbles[i].xOff >= canvas.width-bubbles[i].radius) {
        bubbles[i].velocity.x*=-1;
      }
        bubbles[i].count += bubbles[i].velocity.y;
        bubbles[i].xOff+=bubbles[i].velocity.x;
          bubbles[i].render();
      }

    // ---------------
    // On Bubble Hover
    // ---------------
    c.fillStyle = '#FFF';
    c.font = '30px Arial';
    c.textAlign = 'left';
    c.fillText("Score: "+score,10,30);
    c.fillText("Accuracy: "+accuracy+"%",10,65);
    var W=canvas.width;
          var H=canvas.height;
    c.textAlign = 'center';
          c.font = '60px Arial';
          c.fillStyle = 'red';
          c.strokeStyle = '#fff';
          c.lineWidth = 2;
          c.fillText(timeText,W/2,H/2);
          c.strokeText(timeText,W/2,H/2);
    for (var i = 0; i < bubbles.length; i++) {
    if(bubbles[i].count <= canvas.height-bubbles[i].radius) {
      // console.log(canvas.width*canvas.height, totalArea, i);
      totalArea+=Math.pow(bubbles[i].radius*2, 2);
    }
  }
      var frac=totalArea/(canvas.width*canvas.height);
      if(frac>=0.3 && flagging!=1) {
        settimer();
        
        
        flagging=1;
        
        // waiting=setTimeout(function() {
          
        // },6100);
      }
      else if(flagging==1 && frac<0.3) {
        timeText="";
        ko=6;
        clearInterval(timing);
        
        flagging=0;
      }
    
    
    if(t)
      tow=window.requestAnimationFrame(animate);
  }
  
  window.requestAnimationFrame(animate);



  // ------------------
  // Bubble Constructor
  // ------------------
  function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };
    return rotatedVelocities;
}

function resolveCollision(particle, otherParticle) {
  const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
  const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

  const xDist = otherParticle.position.x - particle.position.x;
  const yDist = otherParticle.position.y - particle.position.y;
  // console.log(xVelocityDiff * xDist + yVelocityDiff * yDist);
  // Prevent accidental overlap of particles
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
      
      // Grab angle between the two colliding particles
      const angle = -Math.atan2(otherParticle.position.y - particle.position.y, otherParticle.position.x - particle.position.x);

      // Store mass in var for better readability in collision equation
      const m1 = particle.mass;
      const m2 = otherParticle.mass;

      // Velocity before equation
      const u1 = rotate(particle.velocity, angle);
      const u2 = rotate(otherParticle.velocity, angle);

      // Velocity after 1d collision equation
      const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
      const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

      // Final velocity after rotating axis back to original location
      const vFinal1 = rotate(v1, -angle);
      const vFinal2 = rotate(v2, -angle);

      // Swap particle velocities for realistic bounce effect
      particle.velocity.x = vFinal1.x;
      particle.velocity.y = vFinal1.y;

      otherParticle.velocity.x = vFinal2.x;
      otherParticle.velocity.y = vFinal2.y;
  }
}

  var createBubble = function() {
    // this.position = {x: 0, y: 0};
    this.hit=false;
    this.velocity={x: (Math.random()-0.5)*bubbleSpeedX, y:bubbleSpeed};
    this.q=(slowDown<liquidLuck)?Math.random()*2:Math.random()*1.9;
    this.radius = radiusBubble + Math.random() * 6;
    this.mass = 5*this.radius;
    this.xOff = this.radius+Math.random() * (canvas.width - 2*this.radius);
    this.yOff = Math.random() * canvas.height;
    this.count = canvas.height + this.yOff;
    this.position = {x: this.xOff, y: this.count};
    for(var mo=0;mo<bubbles.length;mo++) {
      if(getDist(this.position, bubbles[mo].position)<this.radius+bubbles[mo].radius) {
        this.xOff = this.radius+Math.random() * (canvas.width - 2*this.radius);
        this.yOff = Math.random() * canvas.height;
        this.position = {x: this.xOff, y: canvas.height+this.yOff};
        mo=-1;
      }
    }
    for(var ro =0;ro<bubbles.length;ro++) {
      if(getDist(this.position, bubbles[ro].position)<this.radius+bubbles[ro].radius) {
        
      }
    }
    this.count = canvas.height + this.yOff;
    this.color = 'black';//'#8bc9ee';
    this.lines = [];
    this.popping = false;
    this.maxRotation = 85;
    this.rotation = Math.floor(Math.random() * (this.maxRotation - (this.maxRotation * -1))) + (this.maxRotation * -1);
    this.rotationDirection = 'forward';
    this.choice=choose(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,2,3);
    if(this.q>1.9) {
      this.choice=1;
      slowDown++;
    }
    
    if(this.choice==0) {
      this.popCount=0;
      this.sprite=new Sprite({
        ctx:c,
        image: ballImage,
        width: 640,
        height: 128,
        numberOfFrames: 5,
        ticksPerFrame: 4,
        bubble:this
      }, 1.16);
    }
    if(this.choice==2) {
      this.sprite=new Sprite({
        ctx:c,
        image: gauntletImage,
        width: 830,
        height: 284,
        numberOfFrames: 5,
        ticksPerFrame: 8,
        bubble:this
      }, 0.925, [0,198, 160, 151, 177, 143]);
    }
    if(this.choice==3) {
      this.sprite=new Sprite({
        ctx:c,
        image: coinImage,
        width: 1000,
        height: 100,
        numberOfFrames: 10,
        ticksPerFrame: 4,
        bubble:this
      }, 0.6);
    }
    // Populate Lines
    for (var i = 0; i < popLines; i++) {
      var tempLine = new createLine();
          tempLine.bubble = this;
          tempLine.index = i;

      this.lines.push(tempLine);
    }

    // Render the circles
    this.render = function() {
      if(set) {
        for(var ra=0;ra<bubbles.length;++ra) {
          if(bubbles[ra].count<canvas.height/2) {
            bubbles[ra].popping=true;
            burstSound.play();
            for (var a = 0; a < bubbles[ra].lines.length; a++) {
              popDistance = bubbles[ra].radius * 0.5;
              bubbles[ra].lines[a].popping = true;     
            }
          }
        }
        set=false;
      }
      if(this.choice==0 && !this.popping) {
          var transparency=(1-this.popCount*0.2);
          c.globalAlpha=transparency;
          this.sprite.update();
          this.sprite.render();
          c.globalAlpha=1;
        }
      else {
        if(this.choice==2) {
          this.sprite.update();
          this.sprite.render();
          if(this.popping) {
            
            set =true;
          }
        }
        if(this.choice==3) {
          this.sprite.update();
          this.sprite.render();
        }
      if(this.rotationDirection === 'forward') {
        if(this.rotation < this.maxRotation) {
          this.rotation++;
        } else {
          this.rotationDirection = 'backward';
        }
      } else {
        if(this.rotation > this.maxRotation * -1) {
          this.rotation--;
        } else {
          this.rotationDirection = 'forward';
        }
      }

      c.save();
      c.translate(this.position.x, this.position.y);
      c.rotate(this.rotation*Math.PI/180);

      if(!this.popping) {
        

        c.beginPath();
        
        if(this.q>1.9) {
          var gradient = c.createRadialGradient(0,0,0, 0,0, this.radius);
          gradient.addColorStop(0, 'white');
          gradient.addColorStop(1, coloured);
        }
          
        else {
          var gradient = c.createLinearGradient(-this.radius,0, this.radius, 0);
          gradient.addColorStop(0, coloured);
          gradient.addColorStop(1, 'black');
        }
          
        
        c.arc(0, 0, this.radius, 0, Math.PI*2, false);
        c.globalAlpha=0.75;
        c.fillStyle=gradient;
        c.fill();
        if(this.q<1.9) {
        for(var k=0;k<10;k+=0.5) {
            c.beginPath();
            c.strokeStyle = 'white';
            c.lineWidth=0.5*k;
            c.arc(0,0,(this.radius-5),Math.PI*1.5+0.05*Math.PI*k,Math.PI*1.5+0.05*Math.PI*(k+1));
            c.stroke();
        }
        }
        
        // c.lineWidth = 2;
        // c.arc(0, 0, this.radius - 5, 0, Math.PI*1.5, true);
        // c.stroke();
      }
      
      c.restore();
    }
      // Draw the lines
      
      for (var a = 0; a < this.lines.length; a++) {
        if(this.lines[a].popping) {
          if(this.lines[a].lineLength < popDistance && !this.lines[a].inversePop) {
            this.lines[a].popDistance += 0.06;
          } else {
            if(this.lines[a].popDistance >= 0) {
              this.lines[a].inversePop = true;
              this.lines[a].popDistanceReturn += 1;
              this.lines[a].popDistance -= 0.03;
            } else {
              var index=bubbles.indexOf(this);
              if(index>-1)
                bubbles.splice(index, 1);
                
                  console.log(2);
                  var tempBubble = new createBubble();
                  bubbles.push(tempBubble);
                
              break;
            }
          }

          this.lines[a].updateValues();
          if(this.choice!=3)
            this.lines[a].render();
        }
      }
    }

  }



  // ----------------
  // Populate Bubbles
  // ----------------

  for (var i = 0; i < bubbleCount; i++) {
    var tempBubble = new createBubble();

    bubbles.push(tempBubble);
  }



  // ----------------
  // Line Constructor
  // ----------------

  function createLine() {
    this.lineLength = 0;
    this.popDistance = 0;
    this.popDistanceReturn = 0;
    this.inversePop = false; // When the lines reach full length they need to shrink into the end position
    this.popping = false;

    this.updateValues = function() {
      this.x = this.bubble.position.x + (this.bubble.radius + this.popDistanceReturn) * Math.cos(2 * Math.PI * this.index / this.bubble.lines.length);
      this.y = this.bubble.position.y + (this.bubble.radius + this.popDistanceReturn) * Math.sin(2 * Math.PI * this.index / this.bubble.lines.length);
      this.lineLength = this.bubble.radius * this.popDistance;
      this.endX = this.lineLength;
      this.endY = this.lineLength;
    }

    this.render = function() {
      this.updateValues();

      c.beginPath();
      c.strokeStyle = '#8bc9ee';
      c.lineWidth = 2;
      c.moveTo(this.x, this.y);
      if(this.x < this.bubble.position.x) {
        this.endX = this.lineLength * -1;
      }
      if(this.y < this.bubble.position.y) {
        this.endY = this.lineLength * -1;
      }
      if(this.y === this.bubble.position.y) {
        this.endY = 0;
      }
      if(this.x === this.bubble.position.x) {
        this.endX = 0;
      }
      c.lineTo(this.x + this.endX, this.y + this.endY);
      c.stroke();
    };
  }

  


  // ---------------
  // Event Listeners
  // ---------------
  
  canvas.addEventListener('click', mouseMove);

  function mouseMove(e) {
    if(t) {
    total+=1;
    mouseOffset.x = e.offsetX;
    mouseOffset.y = e.offsetY;
    for (var i = 0; i < bubbles.length; i++) {
      if(mouseOffset.x > bubbles[i].position.x - bubbles[i].radius && mouseOffset.x < bubbles[i].position.x + bubbles[i].radius) {
        if(mouseOffset.y > bubbles[i].position.y - bubbles[i].radius && mouseOffset.y < bubbles[i].position.y + bubbles[i].radius) {
          score+=1;
          if(bubbles[i].choice==0 && bubbles[i].popCount<4) {
            bubbles[i].popCount+=1;
          }
          else {
          burstSound.play();
          for (var a = 0; a < bubbles[i].lines.length; a++) {
                popDistance = bubbles[i].radius * 0.5;
                bubbles[i].lines[a].popping = true;
                bubbles[i].popping = true;            
          }
          
          if(bubbles[i].q>1.9) {
            bubbleSpeed/=2;
            bubbleSpeedX/=2;
            setTimeout(function () {
              bubbleSpeed*=2;
              bubbleSpeedX*=2;
            }, 10000)
          }
          if((bubbles[i].popping) && (bubbles[i].choice==3)) {
            radiusSpeed/=2;
            setTimeout(function () {
              radiusSpeed*=2;
            }, 7000);
          }
        }
        }
      }
    }
    
    accuracy=((score/total)*100).toFixed(2);
  }
  else if(gameOver) {
    
    canvas.removeEventListener('click', mouseMove);
    play();
  }
  }

  window.addEventListener('resize', function() {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
  });

var pauseButton=document.getElementById('pausing');
pauseButton.addEventListener("click", pauseGame);
function pauseGame() {
    if(!paused) {
        modals("pause");
        t=false;
        paused=true;
    }
    
}
function modals(item) {
    var modal = document.getElementById("myModal");
    var btn = document.getElementsByClassName("btn1");
    var span = document.getElementsByClassName("close1")[0];
    if(item=="pause") {
        modal.style.display = "block";
        addHtml(item);
        span.onclick = function() {
                    modal.style.display = "none";
                    t=true;
                    
                    paused=false;requestAnimationFrame(animate);
                    if(flagging==1)
                      setTiming();
                    }
    }
}
function addHtml(button) {
    var modalbody=document.getElementsByClassName("modal-body1")[0];
    var modalheading=document.querySelector(".modal-header1 h2");
    if(button=="pause") {
        modalheading.innerHTML="OPTIONS";
        modalbody.innerHTML="<div class='pauseMenu'><button id='resume'>RESUME</button><button onclick=\"window.location.href='index.html'\">GO TO HOME</button></div>";
    }
    
    
    var resumeButton=modalbody.querySelector('#resume');
    resumeButton.addEventListener("click", function() {
        document.getElementsByClassName("close1")[0].click();
    });
}
}