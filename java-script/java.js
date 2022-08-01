let letters = "ابتثجحخدذرزسشصضطظعغفقكلمنهويى";
let lettersArray = Array.from(letters);
let lettersContainer = document.querySelector(".letters");

lettersArray.forEach((letter) => {
  let span = document.createElement("span");
  let spanText = document.createTextNode(letter);
  span.appendChild(spanText);
  span.classList.add("letter-box");
  lettersContainer.appendChild(span);
});

// main object
let words = {
  الفيلم: [
    "عسل اسود",
    "افريكانو",
    "اللمبى",
    "صاحب صاحبه",
    "المركب",
    "الجزيره",
    "الرهينه",
    "امير البحار",
    "وش اجرام",
    "تيتو",
    "الديلر",
    "مطب صناعى",
    "ظرف طارق",
  ],
  رياضه: [
    "ميسى",
    "كريستيانو",
    "محمد صلاح",
    "نيمار",
    "بنزيما",
    "الاهلى",
    "برشلونه",
    "ريال مدريد",
    "ليفربول",
    "مانشستر سيتى",
    "ارسنال",
    "باريس سان جيرمان",
    "بايرن ميونخ",
    "ليدز",
  ],
  الاغنيه: [
    "كتاب حياتى",
    "رجعت من الصفر",
    "انا مش عارفنى",
    "خليك معايا",
    "خليك فاكرنى",
    "عرفت الى فيها",
    "جبار",
    "لو كان ده حب",
    "يوم ورا يوم",
    "الف ليله و ليله",
    "قطر الحياه",
  ],
  البلد: [
    "مصر",
    "المغرب",
    "الكويت",
    "ليبيا",
    "ايطاليا",
    "انجلترا",
    "فرنسا",
    "اليابان",
    "الصين",
    "الهند",
    "اندونيسيا",
    "امريكا",
    "الارجنتين",
    "البرازيل",
    "كندا",
    "استراليا",
    "ايسلاندا",
    "الاسكندريه",
  ],
};
// get the keys of the main object
let allkeys = Object.keys(words);

// get a random number based on the length of the keys of the object
let randomWordsNumber = Math.floor(Math.random() * allkeys.length);

// get the name of the key
let randomWordsName = allkeys[randomWordsNumber];

// get the array of the keys
let randomWordsValue = words[randomWordsName];

// get a random number based on the number of the array of the keys
let randomPropNumber = Math.floor(Math.random() * randomWordsValue.length);

// get a random value based on the number of the array of the keys
let randomPropValue = randomWordsValue[randomPropNumber];

// print the value of the key in its span
document.querySelector(".game-info .category span").innerHTML = randomWordsName;

let letterGuessContainer = document.querySelector(".letter-guess");

let GuessingwordArray = Array.from(randomPropValue);
console.log(GuessingwordArray);

let wrongAttempts = 0;
let theDraw = document.querySelector(".hangman-draw");
console.log(wrongAttempts);
GuessingwordArray.forEach((letter) => {
  let guessSpan = document.createElement("span");
  if (letter === " ") {
    guessSpan.className = "has-space";
  }
  letterGuessContainer.appendChild(guessSpan);
});
let allSpans = document.querySelectorAll(".letter-guess span");

// handle clicking on letter
document.addEventListener("click", (e) => {
  let theStatus = false;
  if (e.target.className === "letter-box") {
    e.target.classList.add("has-clicked");

    let clickedLetter = e.target.innerHTML;
    GuessingwordArray.forEach((wordLetter, index) => {
      if (wordLetter === clickedLetter) {
        theStatus = true;
        allSpans.forEach((spanletter, spanindex) => {
          if (index === spanindex) {
            spanletter.innerHTML = wordLetter;
            spanletter.className = "done";
            let doneClass = document.querySelectorAll(".letter-guess .done");
            let doneClassWithSpace = document.querySelectorAll(
              ".letter-guess .has-space"
            );
            if (
              doneClass.length === GuessingwordArray.length ||
              GuessingwordArray.length ===
                doneClassWithSpace.length + doneClass.length
            ) {
              let congrat = document.createElement("div");
              let congratText = document.createTextNode("الف مبروك يا معلم");
              congrat.appendChild(congratText);
              congrat.className = "popup";
              document.body.appendChild(congrat);
              let restartButton2 = document.createElement("span");
              let restartButtonText2 = document.createTextNode("العب تانى");
              restartButton2.appendChild(restartButtonText2);
              restartButton2.className = "restart";
              congrat.appendChild(restartButton2);
              restartButton2.addEventListener("click", (rest) => {
                if (rest.target.className === "restart") {
                  window.location.reload();
                }
              });
            }
          }
        });
      }
    });

    if (theStatus !== true) {
      wrongAttempts++;

      theDraw.classList.add(`wrong-attempts-${wrongAttempts}`);

      if (wrongAttempts === 10) {
        lettersContainer.classList.add("finished");

        let div = document.createElement("div");
        let divText = document.createTextNode(
          `الراجل اتشنق يا معلم ${randomWordsName} : ${randomPropValue}`
        );
        div.appendChild(divText);
        div.className = "popup";
        let restartButton = document.createElement("span");
        let restartButtonText = document.createTextNode("العب تانى");
        restartButton.appendChild(restartButtonText);
        restartButton.className = "restart";
        div.appendChild(restartButton);
        restartButton.addEventListener("click", (res) => {
          if (res.target.className === "restart") {
            window.location.reload();
          }
        });
        document.body.appendChild(div);
      }
    }
  }
});
