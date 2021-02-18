var playMode=false;
var hideMode=false;
localStorage.setItem("radiusGrow", playMode);
localStorage.setItem("speedFactor", hideMode);
localStorage.setItem("colored", "green");
var colors={v:"violet", i:"indigo", b:"blue", g:"green", y:"yellow", o:"orange", r:"red"};
document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13 && document.getElementsByClassName("modal1")[0].style.display=="none")
      document.getElementsByClassName("selecting")[0].click();
  });
  document.getElementsByClassName("modal1")[0].style.display="none";
    document.addEventListener('keydown', keyPress);
  
    function keyPress() {
      if(event.key=='ArrowDown'||event.key=='Down') {
          if(document.getElementsByClassName("selecting")[0].nextElementSibling!=null) {
              document.getElementsByClassName("selecting")[0].nextElementSibling.classList=["selecting"];
              document.getElementsByClassName("selecting")[0].classList=["menuButton"];
          }
              
          else {
              document.getElementsByClassName("selecting")[0].classList=["menuButton"];
              document.getElementsByClassName("main")[0].firstElementChild.classList=["selecting"];
          }      
      }
      else if(event.key=='ArrowUp'||event.key=='Up') {
          if(document.getElementsByClassName("selecting")[0].previousElementSibling!=null) {
              document.getElementsByClassName("selecting")[0].previousElementSibling.classList=["selecting"];
              document.getElementsByClassName("selecting")[1].classList=["menuButton"];
          }
              
          else {
              document.getElementsByClassName("selecting")[0].classList=["menuButton"];
              document.getElementsByClassName("main")[0].lastElementChild.classList=["selecting"];
          }     
      }  
    }
    function modals(item) {
        var modal = document.getElementById("myModal");
        var btn = document.getElementsByClassName("btn1");
        var span = document.getElementsByClassName("close1")[0];
           for(var i=0;i<btn.length;i++) {
            btn[i].addEventListener("click", function() {
            modal.style.display = "block";
            addHtml(this);
            }); 
        }
            span.onclick = function() {
                        modal.style.display = "none";
                        } 
    }

function addHtml(button) {
    var modalbody=document.getElementsByClassName("modal-body1")[0];
    var modalheading=document.querySelector(".modal-header1 h2");
    if(button.textContent=="INSTRUCTIONS") {
        modalheading.innerHTML="INSTRUCTIONS";
        modalbody.innerHTML="<div class='list-type1'><ol id='olist'><li><a>Click the bubbles as they ascend.</a></li><li><a>Incase you collect a coin inside a bubble the rate of growth of radius will be halved for 7 seconds</a></li><li><a>Incase you burst a bubble shining at the center(Liquid Luck) the rate of generation of bubbles will be halved for 10 seconds</a></li><li><a>For each gauntlet or waving arm you collect the top half of the screen(even rock bubbes) will be cleared but player won't get points for those bubbles</a></li><li><a>The player has to make it to the top 10 to reach the leaderboard</a></li><li><a>If the player plays in quick mode(more bubble generation) or fast growing bubbles mode(radius of bubbles grows rapidly), player gets a multiplier of 2x for each(his point will be multiplied by 2)</a></li><li><a>The players points which will be described in high scores chart is the product of accuracy%, score and the multiplier of the game mode in which he played</a></li><li><a>Rock bubbles will occupy the screen untill you click them 5 times but player gets 5 points and they diminish(or)fade on each click</a></li><li><a>A 'Try again' option allows you to restart the game with the same difficulty modes</a></li><li><a>When around half of the screen gets covered for more than 6 sec(timer will be shown), game will be ended</a></li></ol></div>";
    }


    if(button.textContent=="HIGH SCORES") {
        window.location.href='highScores.html';
    }

    if(button.textContent=="PLAY GAME") {
        playMode=false;
        hideMode=false;
        modalheading.textContent="DIFFICULTY MODES";
        modalbody.innerHTML="<div class='slideshow-container'><div class='mySlides fade'><div class='numbertext'>1 / 3</div><div class='full flexing'></div><div class='text'>Select your color:</div></div><div class='mySlides fade'><div class='numbertext'>2 / 3</div><div class='full'></div><div class='text'>Select your game mode:</div></div><div class='mySlides fade'><div class='numbertext'>3 / 3</div><div class='full inputDiv'></div><div class='text'>Caption Three</div></div><a class='prev' onclick='plusSlides(-1)'>&#10094;</a><a class='next' onclick='plusSlides(1)'>&#10095;</a></div><br>";
        modalbody.innerHTML+="<div style='text-align:center'><span class='dot' onclick='currentSlide(1)'></span><span class='dot' onclick='currentSlide(2)'></span><span class='dot' onclick='currentSlide(3)'></span></div>";
        startSlides();
        slides=document.getElementsByClassName("full");
        
        for(var i=0;i<7;++i) {
           slides[0].innerHTML+="<div class='color' type='button' onclick='colorUpdate(this)'></div>";
           document.getElementsByClassName("color")[i].id=String(Object.keys(colors)[i]);
        }
        slides[1].innerHTML+="<div class='toggleDiv'><label>Quick Mode:</label><div class='toggle'><label class='switch'><input type='checkbox' id='checking1' onchange='hide(this)'><span class='slider round'></span></label></div></div>";
        slides[1].innerHTML+="<div class='toggleDiv'><label>Fast Growing Bubbles:</label><div class='toggle'><label class='switch'><input type='checkbox' id='checking2' onchange='linkStyle(this)'><span class='slider round'></span></label></div></div>";
        thirdSlide();
    }
}
function thirdSlide() {
    var slides=document.getElementsByClassName("full");
    slides[2].innerHTML+="<div class='selecter'><label for='gridBox'>Select radius of bubbles:</label><select id='gridBox'><option value='0'>10-16</option><option selected value='1'>20-26</option><option value='2'>30-36</option></select></div>";
    slides[2].innerHTML+="<button class='target' onclick='setTargets()'>PLAY NOW</button></form>";
    document.getElementsByClassName("text")[2].innerHTML="Set the radius";
}
function linkStyle(btn) {
    playMode = (btn.checked==true)? true: false;
    localStorage.setItem("radiusGrow", playMode);
}

function hide(btn) {
    hideMode = (btn.checked==true)? true: false;
    localStorage.setItem("speedFactor", hideMode);
}

function setTargets() {
    var e=document.getElementById("gridBox");
    var strUser = e.options[e.selectedIndex].value;
    console.log(strUser);
    n=(Number(strUser)+1)*10;
    localStorage.setItem("radiusOfBubbles", n);
       document.getElementsByClassName("close1")[0].click();
       window.location.href='playGame.html';
}
function colorUpdate(btn) {
    color=btn.id;
    localStorage.setItem("colored", colors[color]);
    Array.from(document.getElementsByClassName("color")).forEach(element => element.classList.remove("selected"));
    btn.classList.add("selected");
}

window.onclick = function(event) {
if (event.target == document.getElementById("myModal")) {
    document.getElementsByClassName("close1")[0].click();
  }
}
var slideIndex;
function startSlides() {
  slideIndex = 1;
  showSlides(slideIndex);  
}


function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length)
    slideIndex=n-1;
  else if(n<1)
    slideIndex=1
  else {
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active"; 
  }
}
modals();