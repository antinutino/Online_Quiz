let qus_no = 0;
let qus_data;
let ans;
let correct_answer=0;
const prevbtn = document.querySelector(".button1");
    const nextbtn = document.querySelector(".button2");
    const submitbtn=document.querySelector(".submit");
    const startbtn=document.querySelector(".start");
async function mcqdata() {
    try {
        const response = await fetch("https://raw.githubusercontent.com/antinutino/Json_Files/main/MCQ_Question.json");
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        qus_data = await response.json();
        ans= new Array(qus_data.mcqs.length);
        console.log(qus_data)
        displayQuestion();
    } catch (error) {
        console.error('Error has occurred: ', error);
    }
}

function displayQuestion() {
   
    const question = document.querySelector(".question");
    question.innerHTML = `<h3> <span>Question-${qus_no + 1}:</span> ${qus_data.mcqs[qus_no].question}</h3>`;
    
    const options = document.querySelector(".options");
    options.innerHTML = '';  
    qus_data.mcqs[qus_no].options.map(option => {
        options.innerHTML += `<button class="option">${option}</button>`;

    });
         
 
    document.querySelectorAll('.option').forEach(button => {
            function optioncheck(){
                if(ans[qus_no])
                    {
                        console.log(button.textContent);
                        if(button.textContent==ans[qus_no])
                        button.style.backgroundColor = 'green';
                       else
                       button.style.backgroundColor='';
                    }
            }
            optioncheck();
        button.addEventListener('click', (event) => {
            if(ans[qus_no]!=button.textContent)
            {
                document.querySelectorAll('.option').forEach(btn =>{
                      if(btn.textContent==ans[qus_no])
                        btn.style.backgroundColor='';
                })

                button.style.backgroundColor='green';
            }
            ans[qus_no]=button.textContent;
            console.log(ans[qus_no]);
            
        });
    });

    
    if (qus_no == 0&&qus_no<qus_data.mcqs.length-1) {
        prevbtn.style.display = 'none';
        submitbtn.style.display='none';
    } else {
        prevbtn.style.display = 'block';
        submitbtn.style.display='none';
    }

    if (qus_data.mcqs.length == qus_no + 1) {
        nextbtn.style.display = 'none';
        submitbtn.style.display='block';
    } else {
        nextbtn.style.display = 'block';

    }

   
}

function results(){
    const displayans=document.querySelector(".question_cont")
    displayans.innerHTML='';
    displayans.innerHTML=`<h2 class='ansh1'>Check Result<h2> `;
    qus_data.mcqs.map((questions,index)=>{
  
        displayans.innerHTML+=` <div class="question">
        <h3>Question-${index+1}: ${questions.question}<h3> 
      
</div>
      <div class="options">
           <button class="option">${questions.options[0]}</button>
        <button class="option">${questions.options[1]}</button>
    <button class="option">${questions.options[2]}</button>
<button class="option">${questions.options[3]}</button>
      </div>
      </div>
      `
      if(ans[index]==questions.correct_answer)
        {
          correct_answer++;
        }
      
      document.querySelectorAll(".option").forEach(btn=>{
        if(!ans[index]&&btn.textContent==questions.correct_answer)
              btn.style.backgroundColor='rgb(253, 255, 143)';

       else if(btn.textContent==questions.correct_answer)
            btn.style.backgroundColor='green'
       else{
            if(ans[index]==btn.textContent&&btn.textContent!=questions.correct_answer)
                btn.style.backgroundColor='red';
       }

      })
      
    })
    displayans.innerHTML+=`<h2 class='result'>result: ${correct_answer}/${qus_data.mcqs.length}</h2>`;

}

submitbtn.addEventListener('click',results)

startbtn.addEventListener('click',()=>{
    const displayqus=document.querySelector(".question_cont")
    displayqus.style.display='block';
    startbtn.style.display='none';

})
nextbtn.addEventListener('click', () => {
    qus_no = qus_no + 1;
    displayQuestion();
});


prevbtn.addEventListener('click', () => {
    if (qus_no > 0) {
        qus_no = qus_no - 1;
        displayQuestion();
    }
});

mcqdata();

let examTime = 5*60; 
        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        }

        function updateTimer() {
            const timerElement = document.getElementById('timer');
            timerElement.innerHTML = `Countdown: ${formatTime(examTime)}`;

            if (examTime <= 0) {
                timerElement.innerHTML = "Time's up!";
                timerElement.style.backgroundColor='red';

            }
            if(examTime<=-2)
            {
                clearInterval(timerInterval);
               results();
            }

            examTime--; 
        }

        const timerInterval = setInterval(updateTimer, 1000);

        updateTimer();
  