var score;
let name;
class Question {
    constructor(question, src, choice, options) {
        this.question=question;
        this.src=src;
        this.choice=choice;
        this.options=options;
        this.answer=null;
    }

    showQuestion(index) {
        let optionPre=['(A) ', '(B) ', '(C) ', '(D) '];
        var question=document.getElementsByClassName("ques")[0];
        var options=Array.from(document.getElementsByClassName("option"));
        question.querySelector("h3").innerHTML='Question '+(index+1)+': '+ this.question;
        self=this;
        Array.from(document.querySelectorAll('.front img')).forEach(element => {
            console.log(element);
            element.parentNode.removeChild(element);
        });
        if(this.src!==null) {
            document.getElementsByClassName("ques")[0].insertAdjacentHTML("afterend", "<img src='"+this.src+"' alt='Image'></img>");
        }
        console.log(this.answer);
        for(let n=0;n<options.length;n++) {
            options[n].innerHTML=optionPre[n]+this.options[n];
            options[n].style.backgroundColor='#ebebeb';
            options[n].style.color='black';
            console.log(this.answer===null);
            if(this.answer===null) {
                var el = document.getElementsByClassName('option')[n],
                elClone = el.cloneNode(true);
                el.parentNode.replaceChild(elClone, el);
                elClone.addEventListener('click', function handler () {
                    var el=document.getElementsByClassName("inside")[0];
                    
                    self.checkAnswer(this.id, index);
                    el.classList.add('trans');
                });
            }
            else {
                var el = document.getElementsByClassName('option')[n],
                elClone = el.cloneNode(true);
                el.parentNode.replaceChild(elClone, el);
                var correct=document.getElementById(this.choice);
                var wrong=document.getElementById(this.answer);
                if(n==options.length-1) {
                    if(this.answer===true) {
                        correct.style.backgroundColor='green';
                        correct.style.color='white';
                    } 
                    else {
                        wrong.style.backgroundColor='red';
                        wrong.style.color='white';
                    }
                }
            }
        }
    }

    checkAnswer(userAnswer, index) {
        var answer=document.getElementById("answer");
        var correct=document.getElementById("correct");
        var back=document.getElementsByClassName('back')[0];
        if(this.choice!=userAnswer) {
            document.getElementById('option'+index).style.backgroundColor="red";
            answer.innerHTML='Your answer: '+userAnswer;
            correct.innerHTML='Correct Answer: '+this.choice;
            back.style.backgroundColor='red';
            this.answer=userAnswer;
            score-=1;
            
        }
        else {
            document.getElementById('option'+index).style.backgroundColor="green";
            answer.innerHTML="Correct";
            back.style.backgroundColor='green';
            this.answer=true;
            score+=2;
        }
        console.log(score);
    }
}

class Questions {
    constructor(allArray, num) {
        this.allArray=allArray;
        this.num=num;
    }

    generateRandomQuestionSet(n) {
        let selectedArr=[];
        let arrIndex = [];
        while(selectedArr.length < n) {
            var r = Math.floor(Math.random() * this.num);
            if(arrIndex.indexOf(r) === -1) {
                selectedArr.push(this.allArray[r]);
                arrIndex.push(r);
            }
        }
        return selectedArr;
    }
}

