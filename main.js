// Setting Game Name
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Game  `;
// Setting Game options
let NumberOfTries = 6; 
let NumberOfLetters = 6;
let currentTry = 1;
let numbersofhints=2;
// words manage
let wordtoGuess ="";
 const words =["create","update","delete","master","branch","mainly","elzero","school"];
 wordtoGuess=words[Math.floor(Math.random() * words.length)].toLowerCase();
 let massegearea=document.querySelector(".message");
// mange hints
 document.querySelector(".hint span").innerHTML = numbersofhints ;
 const getHintButton=document.querySelector(".hint");
 getHintButton.addEventListener("click",gethint)
function generateInput() {
    const inputsContainer = document.querySelector(".inputs");
// create main try div
    for (let i = 1; i <= NumberOfTries; i++) {
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML = `<span>Try ${i}</span>`;
        if(i !==1)tryDiv.classList.add("disable-inputs");
// create inputs
        for(let j =1 ;j <= NumberOfLetters ;j++){
            const input=document.createElement("input");
            input.type="text";
            input.id=`guess-${i}-letter-${j}`;
            input.setAttribute("maxlength","1");
            tryDiv.appendChild(input);                 
        }
        inputsContainer.appendChild(tryDiv);
    }
    inputsContainer.children[0].children[1].focus();
    //  disabled  all inputs Except first one
    const inputsindesabledDiv=document.querySelectorAll(".disable-inputs input");
    inputsindesabledDiv.forEach((input) => (input.disabled = true));
    //  convert input to upper case
    const inputs = document.querySelectorAll("input");
    inputs.forEach ((input,index) => {
            input.addEventListener ("input",function () {
                this.value = this.value.toUpperCase();
                // console.log(index)
                const nextinput=inputs[index + 1 ];
                if( nextinput) nextinput.focus();
            });
        
    input.addEventListener("keydown",function (event) {
                // console.log(event);
                const currentindex=Array.from(inputs).indexOf(event.target); // this
                // console.log(currentindex)
                if(event.key==="ArrowRight"){
                    const nextinput = currentindex + 1
                    if(nextinput < inputs.length ) inputs[nextinput].focus();
                }
                if(event.key==="ArrowLeft"){
                    const preinput = currentindex - 1
                    if(preinput >= 0 ) inputs[preinput].focus();
                }
               
            });

        });
        }
         
console.log(wordtoGuess);
const guessButton=document.querySelector(".check");
guessButton.addEventListener("click",handleGuesses);

function handleGuesses() {
    let successGuess = true; 
    for (let i = 1; i <= NumberOfLetters; i++) {
      const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`);
      const letter = inputField.value.toLowerCase();
    //   console.log(letter);
        const actualLetter = wordtoGuess[i - 1];

   // game logic
   if( letter === actualLetter ){
    // letter is correct and in place
    inputField.classList.add("in-place");
   } else if (wordtoGuess.includes(letter) && letter !==""){
    // letter is correct and not in place
    inputField.classList.add("not-in-place");
    successGuess = false;

   } else {
    inputField.classList.add("no");
    successGuess = false;

   }
    }
    // check if user win or lose
    if(successGuess){
        console.log("you win");
        massegearea.innerHTML = ` you win the word is <span>${wordtoGuess}</span>`;
        getHintButton.disabled = true

        if( numbersofhints === 2 ){                  

            massegearea.innerHTML = `<p>congratz you didn't use hints</p> `;

        }
        // Add  Disabled class to All Inputs
        let allTries = document.querySelectorAll(".inputs >div");
        allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));
        // disabled guess button
        guessButton.disabled = true;

    }

    else{

        // document.querySelector(`.try-${currentTry}`).classList.add("disabled-inputs");
            document.querySelector(`.try-${currentTry}`).classList.add("disable-inputs"); 
        const currentTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
        currentTryInputs.forEach((input) => (input.disabled = true) );
            currentTry++;
            const nexttryinputs= document.querySelectorAll(`.try-${currentTry} input`);
            // document.querySelector(`.try-${currentTry}`).classList.remove("disable-inputs"); 
            nexttryinputs.forEach((input) => (input.disabled = false) );
            let el = document.querySelector(`.try-${currentTry}`);
            if(el){            
                document.querySelector(`.try-${currentTry}`).classList.remove("disable-inputs"); 
                el.children[1].focus();
            }else{
                 // disabled guess button
                     guessButton.disabled = true;
                     getHintButton.disabled = true
                     massegearea.innerHTML = `you lose the game in <span>${wordtoGuess}</span>`;
            }

    }

}
// function gethint(){
//     if(numbersofhints > 0){
//         numbersofhints--;
//         document.querySelector(".hint span").innerHTML = numbersofhints;
//     }
//     if(numbersofhints === 0){
//         getHintButton.disabled = true;

//     }
//     const enabledInputs=document.querySelectorAll("input:not(disabled)")
//     // console.log(enabledInputs)
//     const emptyEnabledInputs =Array.from(enabledInputs).filter((input) => input.value === "");

//     if (emptyEnabledInputs.length > 0) {
//             const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
//             const randomInput = emptyEnabledInputs[randomIndex];
//             const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
//             // console.log(randomIndex);
//             // console.log(randomInput);
//             // console.log(indexToFill);
//             if (indexToFill !== -1) {
//               randomInput.value = wordtoGuess[indexToFill].toUpperCase();
//             }
//           }

// }
function gethint(){
    // Check if hints are available
    if (numbersofhints > 0) {
        numbersofhints--;
        document.querySelector(".hint span").innerHTML = numbersofhints;

        if (numbersofhints === 0) {
            getHintButton.disabled = true;
            return; // Exit function if no hints are left
        }

        const enabledInputs = document.querySelectorAll("input:not([disabled])");
        const emptyEnabledInputs = Array.from(enabledInputs).filter(input => input.value === "");

        if (emptyEnabledInputs.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
            const randomInput = emptyEnabledInputs[randomIndex];
            const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
            if (indexToFill !== -1) {
                randomInput.value = wordtoGuess[indexToFill].toUpperCase();
            }
        }
    }
}

function handleBackspace(event){
    if(event.key === "Backspace" ){
        const inputs=document.querySelectorAll("input:not(disabled)");
        const currentIndex = Array.from(inputs).indexOf(document.activeElement);
        console.log(currentIndex);
        if(currentIndex > 0){
            const currentInput = inputs[currentIndex];
            const prevInput = inputs[currentIndex - 1];
            currentInput.value="";
            prevInput.value="";
            prevInput.focus();
        }

    }
}
document.addEventListener("keydown",handleBackspace)
window.onload = function(){
    generateInput();
};



// Setting Game Name
// let gameName = "Guess The Word";
// document.title = gameName;
// document.querySelector("h1").innerHTML = gameName;
// document.querySelector("footer").innerHTML = `${gameName} Game Created By Elzero Web School`;

// // Setting Game Options
// let numbersOfTries = 6;
// let numbersOfLetters = 6;
// let currentTry = 1;
// let numberOfHints = 2;

// // Manage Words
// let wordToGuess = "";
// const words = ["Create", "Update", "Delete", "Master", "Branch", "Mainly", "Elzero", "School"];
// wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
// let messageArea = document.querySelector(".message");

// // Manage Hints
// document.querySelector(".hint span").innerHTML = numberOfHints;
// const getHintButton = document.querySelector(".hint");
// getHintButton.addEventListener("click", getHint);

// function generateInput() {
//   const inputsContainer = document.querySelector(".inputs");

//   // Create Main Try Div
//   for (let i = 1; i <= numbersOfTries; i++) {
//     const tryDiv = document.createElement("div");
//     tryDiv.classList.add(`try-${i}`);
//     tryDiv.innerHTML = `<span>Try ${i}</span>`;

//     if (i !== 1) tryDiv.classList.add("disabled-inputs");

//     // Create Inputes
//     for (let j = 1; j <= numbersOfLetters; j++) {
//       const input = document.createElement("input");
//       input.type = "text";
//       input.id = `guess-${i}-letter-${j}`;
//       input.setAttribute("maxlength", "1");
//       tryDiv.appendChild(input);
//     }

//     inputsContainer.appendChild(tryDiv);
//   }
//   // Focus On First Input In First Try Element
//   inputsContainer.children[0].children[1].focus();

//   // Disable All Inputs Except First One
//   const inputsInDisabledDiv = document.querySelectorAll(".disabled-inputs input");
//   inputsInDisabledDiv.forEach((input) => (input.disabled = true));

//   const inputs = document.querySelectorAll("input");
//   inputs.forEach((input, index) => {
//     // Convert Input To Uppercase
//     input.addEventListener("input", function () {
//       this.value = this.value.toUpperCase();
//       // console.log(index);
//       const nextInput = inputs[index + 1];
//       if (nextInput) nextInput.focus();
//     });

//     input.addEventListener("keydown", function (event) {
//       // console.log(event);
//       const currentIndex = Array.from(inputs).indexOf(event.target); // Or this
//       // console.log(currentIndex);
//       if (event.key === "ArrowRight") {
//         const nextInput = currentIndex + 1;
//         if (nextInput < inputs.length) inputs[nextInput].focus();
//       }
//       if (event.key === "ArrowLeft") {
//         const prevInput = currentIndex - 1;
//         if (prevInput >= 0) inputs[prevInput].focus();
//       }
//     });
//   });
// }

// const guessButton = document.querySelector(".check");
// guessButton.addEventListener("click", handleGuesses);

// console.log(wordToGuess);

// function handleGuesses() {
//   let successGuess = true;
//   console.log(wordToGuess);
//   for (let i = 1; i <= numbersOfLetters; i++) {
//     const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`);
//     const letter = inputField.value.toLowerCase();
//     const actualLetter = wordToGuess[i - 1];

//     // Game Logic
//     if (letter === actualLetter) {
//       // Letter Is Correct And In Place
//       inputField.classList.add("yes-in-place");
//     } else if ( wordToGuess.includes(letter) && letter !== "")
//      {
//       // Letter Is Correct And Not In Place
//       inputField.classList.add("not-in-place");
//       successGuess = false;
//     } 
//     else {
//       inputField.classList.add("no");
//       successGuess = false;
//     }
//   }

//   // Check If User Win Or Lose
//   if (successGuess) {
//     messageArea.innerHTML = `You Win The Word Is <span>${wordToGuess}</span>`;
//     if (numberOfHints === 2) {
//       messageArea.innerHTML = `<p>Congratz You Didn't Use Hints</p>`;
//     }

//     // Add Disabled Class On All Try Divs
//     let allTries = document.querySelectorAll(".inputs > div");
//     allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));

//     // Disable Guess Button
//     guessButton.disabled = true;
//     getHintButton.disabled = true;
//   } else {
//     document.querySelector(`.try-${currentTry}`).classList.add("disabled-inputs");
//     const currentTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
//     currentTryInputs.forEach((input) => (input.disabled = true));

//     currentTry++;

//     const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
//     nextTryInputs.forEach((input) => (input.disabled = false));

//     let el = document.querySelector(`.try-${currentTry}`);
//     if (el) {
//       document.querySelector(`.try-${currentTry}`).classList.remove("disabled-inputs");
//       el.children[1].focus();
//     } else {
//       // Disable Guess Button
//       guessButton.disabled = true;
//       getHintButton.disabled = true;
//       messageArea.innerHTML = `You Lose The Word Is <span>${wordToGuess}</span>`;
//     }
//   }
// }

// function getHint() {
//   if (numberOfHints > 0) {
//     numberOfHints--;
//     document.querySelector(".hint span").innerHTML = numberOfHints;
//   }
//   if (numberOfHints === 0) {
//     getHintButton.disabled = true;
//   }

//   const enabledInputs = document.querySelectorAll("input:not([disabled])");
//   // console.log(enabledInputs);
//   const emptyEnabledInputs = Array.from(enabledInputs).filter((input) => input.value === "");
//   // console.log(emptyEnabledInputs);

//   if (emptyEnabledInputs.length > 0) {
//     const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
//     const randomInput = emptyEnabledInputs[randomIndex];
//     const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
//     // console.log(randomIndex);
//     // console.log(randomInput);
//     // console.log(indexToFill);
//     if (indexToFill !== -1) {
//       randomInput.value = wordToGuess[indexToFill].toUpperCase();
//     }
//   }
// }

// function handleBackspace(event) {
//   if (event.key === "Backspace") {
//     const inputs = document.querySelectorAll("input:not([disabled])");
//     const currentIndex = Array.from(inputs).indexOf(document.activeElement);
//     // console.log(currentIndex);
//     if (currentIndex > 0) {
//       const currentInput = inputs[currentIndex];
//       const prevInput = inputs[currentIndex - 1];
//       currentInput.value = "";
//       prevInput.value = "";
//       prevInput.focus();
//     }
//   }
// }

// document.addEventListener("keydown", handleBackspace);

// window.onload = function () {
//   generateInput();
// };