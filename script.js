const quizData = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Markup Language",
            "Hyper Tabular Markup Language",
            "None of these"
        ],
        correctOptionIndex: 0,
        
    },
    {
        question: "Which language runs in a web browser?",
        options: [
            "Java",
            "C",
            "Python",
            "JavaScript"
        ],
        correctOptionIndex: 3,
        
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Colorful Style Sheets",
            "Computer Style Sheets"
        ],
        correctOptionIndex: 1,
        
    },
    {
        question: "Which is a JavaScript framework?",
        options: [
            "Laravel",
            "Django",
            "React",
            "Flask"
        ],
        correctOptionIndex: 2,
        
    },
    {
        question: "Which HTML tag is used to define a hyperlink?",
        options: [
            "<a>",
            "<link>",
            "<href>",
            "<hlink>"
        ],
        correctOptionIndex: 0,
        
    }
];


/////


  let  currentQuestionIndex=0;
  let score=0;
  let timer;
  let correctcount=0;
  let incorrectcount=0;
  let wrongcount=0;
  let useranswers = new Array(quizData.length).fill(null);
  let timeleft = new Array(quizData.length).fill(30);

  const questionText=document.getElementById("question");
  const optionsContainer=document.getElementById("answers");
  const scoreDisplay=document.getElementById("score");
  const timerDisplay=document.getElementById("timer");
  let navigation=document.getElementsByClassName("nav-button");
  const quizContainer=document.getElementById("container");
  const resultContainer = document.getElementById("result-container");
  const finalScore = document.getElementById("final-score");
  const restartBtn=document.getElementById("restart-btn");
  const correctanswer=document.getElementById("correctans");
  const incorrectans=document.getElementById("incorrectans");


  let options=[
      document.getElementById("opt1"),
      document.getElementById("opt2"),
      document.getElementById("opt3"),
      document.getElementById("opt4"),
  ];

//////


function displayquestion(){
    let data=quizData[currentQuestionIndex];
    questionText.textContent=data.question;

    options.forEach((btn,index)=>{
        btn.textContent=data.options[index];

        btn.style.backgroundColor="";
        btn.disabled=false;

        if(useranswers[currentQuestionIndex] !== null){
            let selectanswer = useranswers[currentQuestionIndex];

        //    if(selectanswer === data.correctOptionIndex){
        //     btn.style.backgroundColor="green";
        //    }
        //    else{
        //     btn.style.backgroundColor="red";
        //    }
           btn.disabled=true;
        }
        else if(timeleft[currentQuestionIndex] == 0){
            btn.disabled=true;
        }
    });
}


//////


function startTimer(){
    clearInterval(timer);
    
    timerDisplay.textContent=timeleft[currentQuestionIndex];

    timer=setInterval(()=>{
        if(timeleft[currentQuestionIndex]>0){
            timeleft[currentQuestionIndex]--;
            timerDisplay.textContent=timeleft[currentQuestionIndex];
        }
        else if(timeleft[currentQuestionIndex]==0){
            timerDisplay.textContent=timeleft[currentQuestionIndex];
            clearInterval(timer);
            nextquestion();
            
        }
    },500);
}


/////


options.forEach(btn => btn.addEventListener("click",selectanswer));



function selectanswer(event){
    let selectedIndex=parseInt(event.target.dataset.index);
    let correctindex=quizData[currentQuestionIndex].correctOptionIndex;

    if(useranswers[currentQuestionIndex]===null){
        useranswers[currentQuestionIndex]=selectedIndex;
    }


    if(selectedIndex==correctindex){
        
        event.target.style.backgroundColor="green";
        options.forEach(btn=>(btn.disabled=true));
        score+=4;
        correctcount++;
        // scoreDisplay.textContent=score;
    }
    else if(selectedIndex != correctindex){
        
        event.target.style.backgroundColor="red";
        options.forEach(btn=>(btn.disabled=true));
        score--;
        incorrectcount++;
        // scoreDisplay.textContent=score;
        
    }
   

    setTimeout(nextquestion,1000);
    clearInterval(timer);
     
        
}

//////

function nextquestion(){
    if(currentQuestionIndex < quizData.length - 1){
        currentQuestionIndex++;
        displayquestion();
        startTimer();
    }
    else{
        showresult();
        
    }
}


function showresult(){
    clearInterval(timer);
    
    quizContainer.style.display="none";
    resultContainer.style.display="block";
    finalScore.textContent=score;
    correctans.textContent=correctcount;
    incorrectans.textContent=incorrectcount;
}

/////
 

for(let i = 0; i < navigation.length; i++ ){
    navigation[i].addEventListener("click",function(){
        currentQuestionIndex=i;
        displayquestion();
        startTimer();
    });
}


restartBtn.addEventListener("click",function(){
    currentQuestionIndex = 0;
    score = 0;
    correctcount=0;
    incorrectcount=0;
    scoreDisplay.textContent = score;
    useranswers.fill(null);
    timeleft.fill(30);

    resultContainer.style.display = "none";
    quizContainer.style.display = "block";

    displayquestion();
    startTimer();
})




/////

displayquestion();
startTimer();