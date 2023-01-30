const start_btn=document.querySelector(".button .start");
const exit_btn=document.querySelector(".button .exit");
const exit_btn2=document.querySelector(".result-button .exit");
const quiz_box=document.querySelector(".quiz-box");
const quesans_box=document.querySelector(".ques-ans");
const box=document.querySelector(".box");
const result_box=document.querySelector(".result-box");
const restart_btn=document.querySelector(".result-button .restart");
const option_list=document.querySelector(".ans-box");
const timerCount=document.querySelector(".timer .seconds");

let ques_count=0;
let ques_num=1;
let counter;
let timeValue=15;
let widthValue=0;
let scores=0;
let tick='<div class="icon-tick"><i class="fa-solid fa-check"></i></div>';
let cross='<div class="icon-cross"><i class="fa-solid fa-times"></i></div>';


//start button clicked
start_btn.onclick =()=> {
    quiz_box.classList.add("activeQuiz");
    box.classList.add("unactiveInfo");
    showQuestion(0);
    showCount(1);
    startTimer(timeValue);
}

//exit button clicked
exit_btn.onclick=()=>{
    let window =
                open("file:///D:/quiz_with_timer/index.html", '_self');
    
    window.close();
}
exit_btn2.onclick=()=>{
    let window =
                open("file:///D:/quiz_with_timer/index.html", '_self');
    
    window.close();
}

//to get ques and options from array
function showQuestion(index){
    const question=document.querySelector(".question");
    let que_tag="<span>"+questions[index].numb+"."+questions[index].question+"</span>";
    let ans_tag='<div class="answer"><span class="left">'+questions[index].options[0]+'</span></div>'+
                '<div class="answer"><span class="left">'+questions[index].options[1]+'</span></div>'+
                '<div class="answer"><span class="left">'+questions[index].options[2]+'</span></div>'+
                '<div class="answer"><span class="left">'+questions[index].options[3]+'</span></div>';
    question.innerHTML=que_tag;
    option_list.innerHTML=ans_tag;

    const option=option_list.querySelectorAll(".answer");
    for (let i=0;i<option.length;i++){
        option[i].setAttribute("onclick","optionSelected(this)");
    }
}

//check if answer selected is correct or not 
function optionSelected(answer){
    clearInterval(counter);
    // clearInterval(counterLine);
    let userAns=answer.textContent;
    let correctAns=questions[ques_count].answer;
    let allOptions=option_list.children.length;
    
    if(userAns==correctAns){
        scores+=1;
        answer.classList.add("correctAns");
        console.log("Answer is correct.");
        answer.insertAdjacentHTML("beforeend",tick);
    }
    else{
        answer.classList.add("wrongAns");
        console.log("Answer is incorrect.")
        answer.insertAdjacentHTML("beforeend",cross);
        // //automatically select correct answer if wrong
        // for(let i=0;i<allOptions;i++){
        //     if(option_list.children[i].textContent==correctAns){
        //         option_list.children[i].classList.setAttribute("class","answer correctAns");
        //     }
        // }
    }
    //once selected disable  all options
    for(let i=0; i<allOptions;i++){
     option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display="block";
}

//Next button clicked
const next_btn=document.querySelector(".next-button button");
next_btn.onclick=()=>{
    ques_count++;
    ques_num++;

    if (ques_count>9){
        result_box.classList.add("activeResult")
        quiz_box.classList.remove("activeQuiz");
        showScore();
    }
    showQuestion(ques_count);
    showCount(ques_num);
    clearInterval(counter);
    startTimer(timeValue);
    next_btn.style.display="none";
    
}

//questions count
function showCount(index){
const que_attempt=document.querySelector(".count");
attempt_tag='Questions:<p>'+index+'</p>/<p>'+questions.length+'</p>';
que_attempt.innerHTML=attempt_tag;
}

//Restart button clicked
restart_btn.onclick =()=> {
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    showQuestion(0);
    showCount(1);
    ques_count=0;
    ques_num=1;
    scores=0;
}

//timer
function startTimer(time){
    counter=setInterval(timer,700);
    let allOptions=option_list.children.length;
    function timer(){
        timerCount.textContent=time;
        time--;
        if(time<0){
            clearInterval(counter);
            timerCount.textContent="0";
            for(let i=0; i<allOptions;i++){
                option_list.children[i].classList.add("disabled");
               }
            next_btn.style.display="block";
        }
    }
}

//showing score in result box
function showScore(){
    const userScore=document.querySelector(".score-box .score");
    const userComment=document.querySelector(".score-box .comment");
    userScore.innerHTML=scores;
    if (scores>8){
        userComment.innerHTML="Well Done!! Keep it Up:)";
    }
    else if(scores==7 || scores==8){
        userComment.innerHTML="Not Bad.";
    }
    else{
        userComment.innerHTML="Poor Performance:(";
    }
}