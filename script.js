

// Spinner Toggle Function
function toggleSpinner(show) {
    const spinner = document.getElementById("spinner");
    spinner.classList.toggle("hidden", !show);
  }
  //API1 fetch
  const loadLevels = () => {
  
    fetch("https://openapi.programming-hero.com/api/levels/all")
      .then((res) => res.json())
      .then((data) => {
        displayLevels(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const displayLevels = (data) => {
    const buttonContainer = document.getElementById("button-container");
    buttonContainer.innerHTML = ""; // Clear previous buttons
  
    data.forEach(item => {
      const buttonDiv = document.createElement("div");
      buttonDiv.innerHTML = `
        <button id="btn-${item.level_no}" onclick="loadwordLevels(${item.level_no})" class="levelNo-btn flex justify-center items-center gap-2 border border-blue-700 text-blue-800 px-4 py-2 rounded text-center w-32">
          <img src="assets/fa-book-open.png" alt=""> Lesson-${item.level_no}
        </button>`;
      buttonContainer.appendChild(buttonDiv);
    });
  };
  
  //modal function
  const loadIndividualWord = (modalID)=>{
    fetch(`https://openapi.programming-hero.com/api/word/${modalID}`)
    .then((res) => res.json())
    .then((data) => {
      displayIndividualWord(data.data);
    })
    .catch((error) => {
      console.log(error);
    });
  };
  
  const displayIndividualWord = (individualWord) => {
    //console.log(individualWord);
   const modalContainer=document.getElementById("modal-container");
   modalContainer.innerHTML = `
   
      <h1 class="text-2xl font-bold text-gray-800">
         ${individualWord.word}
         (<i class="fa-solid fa-microphone"></i> ${individualWord.pronunciation})
      </h1>
   
      <p class="mt-4 font-bold text-xl ">Meaning</p>
      <p class="text-gray-600">${individualWord.meaning? individualWord.meaning : "অর্থ পাওয়া যায়নি"}</p>
   
      <p class="mt-4 font-bold text-xl">Example</p>
      <p class="text-gray-600 italic">"${individualWord.sentence}"</p>
   
      <p class="mt-4 font-bold ">সমার্থক শব্দ গুলো</p>
      <div class="flex flex-wrap gap-2 mt-2">
         ${individualWord.synonyms.forEach(synonym => `
            <span class="bg-blue-100  px-4 py-2 rounded-lg font-semibold shadow-md">
               ${synonym}
            </span>
         `).join("")}
      </div>
   
   `;
   
  
   document.getElementById("showModalData").click();
   
  
  
     
   
  
  
  }
  
  //Remove active the all button function
  const activeButtonClass = () => {
    const activeButtons = document.getElementsByClassName("levelNo-btn");
    for (let btn of activeButtons) {
      btn.classList.remove("active");
    }
  };
  //API2 Fetch
  const loadwordLevels = (id) => {
  
    toggleSpinner(true);
  
    fetch(`https://openapi.programming-hero.com/api/level/${id}`)
      .then((res) => res.json())
      .then((data) => {
        toggleSpinner(false); // Hide spinner
        activeButtonClass();
        const activeBtn = document.getElementById(`btn-${id}`);
        activeBtn.classList.add("active");
        displayWordLevels(data.data);
      })
      .catch((error) => {
        console.log(error);
        toggleSpinner(false); // Hide spinner on error
      });
  };
  
  const displayWordLevels = (words) => {
    const cardContainer = document.getElementById("cards-container");
  
    //console.log(words);
    cardContainer.innerHTML = ""; // Clear old content
    if (words.length == 0) {
      cardContainer.classList.remove("grid");
      cardContainer.innerHTML = `
  <div class="min-h-[400px] flex flex-col gap-4 justify-center items-center">
  
    <img src="assets/alert-error.png" alt="">
    <h1 class=""> এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি। </h1>
    <p class="text-2xl font-semibold">একটি Lesson Select করুন।</p>
    
  </div>
       
      `
      return;
  
    } else {
      cardContainer.classList.add("grid");
    }
  
  
    cardContainer.classList = "grid grid-cols-3 gap-14 justify-center py-10 bg-gray-100";
  
    words.forEach(word => {
      const card = document.createElement("div");
      card.classList = "text-ellipsis overflow-hidden bg-white p-6 rounded-2xl shadow-lg w-96 h-60 text-center space-y-3";
      card.innerHTML = `        
        <h1 class="text-xl font-bold ">${word.word}</h1>
        <p>Meaning/Pronunciation</p>
        <p class="text-md font-semibold text-gray-600">"${word.meaning ? word.meaning : "অর্থ নেই"}/${word.pronunciation}"</p>
        <div class="flex justify-between">
          <button onclick="loadIndividualWord(${word.id})" class="bg-gray-200 w-8 h-8">
            <i class="fa-solid fa-circle-info text-gray-600"></i>
          </button>
          <button class="bg-gray-200 w-8 h-8"> 
            <i class="fa-solid fa-volume-low text-gray-600"></i>
          </button>
        </div>`;
      cardContainer.appendChild(card);
    });
  };
  
  loadLevels(); // Load levels on page load
  
  
  
  