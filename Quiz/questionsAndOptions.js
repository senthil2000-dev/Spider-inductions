var question1 = new Question('Which of the following statement is/are correct about Favipiravir?', null, 4, ['Favipiravir is an antiviral COVID-19 drug.', 'Glenmark Pharmaceuticals under the brand name FabiFlu has launched an antiviral drug Favipiravir.', 'It is India\'s first COVID-19 drug launched, priced at Rs 103 per tablet.', 'All the above are correct']);
var question2 = new Question('How many countries, areas or territories are suffering from novel coronavirus outbreak in the World?', null, 4, ['More than 50', 'More than 100', 'More than 150', 'More than 200']);
var question3 = new Question('Thailand announced that it has proceeded to test its novel coronavirus vaccine on which animal/bird?', null, 1, ['Monkeys', ' Lizards', ' Hens', 'Kites']);
var question4 = new Question('In a study, which cells are found in COVID-19 patients \'bode well\' for long term immunity?', null, 3, ['P-cell', 'D-cell', 'T-cell', 'Endothelial Cells']);
var question5 = new Question('Name the vaccine that is jointly developed by the German company BioNTech and US pharma giant Pfizer for COVID-19?', null, 1, ['BNT162', 'PICOVACC', 'Both A and B', 'Neither A nor B']);
var question6 = new Question('Name a clinical trial in which blood is transfused from recovered COVID-19 patients to a coronavirus patient who is in critical condition?', null, 1, ['Plasma Therapy', 'Solidarity', 'Remdesivir', 'Hydroxychloroquine']);
var question7 = new Question('How does Coronavirus transmit?', null, 4, ['When a person sneezes or cough, droplets spread in the air or fall on the ground and nearby surfaces.' , 'If another person is nearby and inhales the droplets or touches these surfaces and further touches his face, eyes or mouth, he or she can get an infection.', 'If the distance is less than 1 meter from the infected person.', 'All the above are correct.']);
var question8 = new Question('Coronaviruses are named for the spikes that protrude from their surfaces, resembling ______.', 'https://static01.nyt.com/images/2020/02/13/science/13coronavirus-explainer-copyLN/13coronavirus-explainer-superJumbo-v2.jpg', 4, ['a shark’s teeth', 'barbed wire', 'football cleats', 'the sun’s corona']);
var question9 = new Question('Which of the following is NOT a common symptom of the coronavirus?', 'https://static01.nyt.com/images/2020/02/27/world/27xp-spread-pix3-LN/27xp-spread-pix3-superJumbo.jpg', 3, ['dry cough', 'breathing difficulty', 'rashes', 'fever']);
var question10 = new Question('Most people fall ill five to seven days after exposure, but symptoms may appear in as few as two days or as many as ______  days.', 'https://static01.nyt.com/images/2020/03/03/us/03virus-symptoms-image-copyLN/03virus-symptoms-image-superJumbo-v2.jpg', 1, ['14', '21', '28', '30']);
let arr=[];
numInQuestionBank=10;
for(let m=1;m<=numInQuestionBank;m++) {
    arr.push(window['question'+m]);
}
var questionSet=[];
var index=0;
function init() {
    element=document.getElementById("sideBar").style.display="none";
    document.getElementsByClassName('regame')[0].style.display="none";
    document.getElementsByClassName('question-card')[0].style.display="none";
    document.getElementsByClassName("btn")[1].style.display="none";
}
function startGame() {
    document.getElementById("sideBar").style.display="";
    
    document.getElementsByClassName('in')[0].style.display="none";
    document.getElementsByClassName("btn")[0].style.display="none";
    
    name=(document.getElementsByClassName('in')[0].value!="")?document.getElementsByClassName('in')[0].value:"You";
    playGame();
}
const replayBtn = document.querySelector('.replay');
const display = document.querySelector('#timer');
function playGame() {
    score=0;
    document.getElementsByClassName('question-card')[0].style.display="";
    document.getElementsByClassName("btn")[1].style.display="";
    var timeInMin = 600;
    startTimer(timeInMin, display);
    var questions=new Questions(arr, numInQuestionBank);
    questionSet=questions.generateRandomQuestionSet(numInQuestionBank);
    questionSet[index].showQuestion(0);
    console.log(arr);
}
function plusQues(change) {
    if((index+change<0)||(index+change>=numInQuestionBank)) {
        console.log(score);
        return;
    }
        
    var el=document.getElementsByClassName("inside")[0];
    el.classList.remove('trans');  
    console.log(index);
    index+=change;
    console.log(index);
    questionSet[index].showQuestion(index);
}
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    let t=setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(t);
            document.getElementsByClassName("done")[0].click();
        }
    }, 1000);
}
init();