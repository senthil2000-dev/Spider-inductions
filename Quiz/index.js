function toggleSidebar() {
    document.getElementById('sideBar').classList.toggle('active');
}
panel=document.getElementById('panel');
for(let m=0;m<numInQuestionBank;m++) {
    panel.innerHTML+="<li id=option"+m+" onclick='toggle("+m+")'>Question. "+(m+1)+"</li>";
}
function toggle(n) {
    document.getElementsByClassName("inside")[0].classList.remove('trans');
    index=n;
    questionSet[n].showQuestion(n);
}

function displayScore() {
    document.getElementsByClassName('regame')[0].style.display="";
    display.style.display="none";
    element=document.getElementById("sideBar");
    element.style.display='none';
    element=document.getElementsByClassName("question-card")[0];
    element.style.display='none';
    element=document.getElementsByClassName("btn")[1];
    element.style.display='none';
    element=document.getElementsByClassName("content")[0];
    
    var highScore=JSON.parse(localStorage.getItem("score"));
    console.log(highScore);
    var player={
        namePlayer:name,
        dateTime: new Date().toLocaleString(),
        playerScore:score
        };
    if(highScore===null) {
        element.innerHTML=name+" scored "+ score;
        localStorage.setItem("score", JSON.stringify(player));
    }
    else if(score>highScore.playerScore) {
        localStorage.setItem("score", JSON.stringify(player));
        element.innerHTML="Congrats "+name+"! You have secured the highest score";
    }
    else {
        element.innerHTML=name+" scored " + score+"<br> High Score: "+highScore.playerScore+" secured by "+highScore.namePlayer+" on "+player.dateTime;
    }
}
