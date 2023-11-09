//Initialize the game board on page load
initBoard()
initCatRow()

document.querySelector('button').addEventListener('click', buildCategories)

//CREATED CATEGORY ROW

function initCatRow(){
  let catRow = document.getElementById('category-row')
  for(let i = 0; i < 6; i++){
    let catItem = document.createElement('div')
    catItem.className = 'clue-box category-box'
    catRow.appendChild(catItem)
  }
}


//CREATED CLUE BOARD


function initBoard(){
  let board = document.getElementById('clue-board')
  //generate 5 rows, then place 6 boxes in each row
  for(let i = 0; i < 5; i++){
    let row = document.createElement('div')
    let boxValue = 200 * (i + 1)
    row.className = 'clue-row'

    //initial loop runs once, and then nested loop runs six times and appends 6 other divs to the row, then initial loop runs again....etc.

    for(let j = 0; j < 6; j++){
      let box = document.createElement('div')
      box.className= 'clue-box'
      box.textContent = `$${boxValue}`
      box.addEventListener('click', getClue)
      row.appendChild(box)
    }


    board.appendChild(row)

  }
}

//CALLED API

function randomInt(){
  return Math.floor(Math.random() * (18418) + 1)
}

let catArray = [] //using global variable to store api object

function buildCategories (){
  
  if(!(document.getElementById('category-row').firstChild.innerText = '')){
    resetBoard();
  }
  
  const fetchRequest1 = fetch(
    `https://jservice.io/api/category?&id=${randomInt()}`
  ).then((res) => res.json())
  
  const fetchRequest2 = fetch(
    `https://jservice.io/api/category?&id=${randomInt()}`
  ).then((res) => res.json())

  const fetchRequest3 = fetch(
    `https://jservice.io/api/category?&id=${randomInt()}`
  ).then((res) => res.json())

  const fetchRequest4 = fetch(
    `https://jservice.io/api/category?&id=${randomInt()}`
  ).then((res) => res.json())

  const fetchRequest5 = fetch(
    `https://jservice.io/api/category?&id=${randomInt()}`
  ).then((res) => res.json())

  const fetchRequest6 = fetch(
    `https://jservice.io/api/category?&id=${randomInt()}`
  ).then((res) => res.json())

  const allData = Promise.all([fetchRequest1, fetchRequest2, fetchRequest3, fetchRequest4, fetchRequest5, fetchRequest6])

  allData.then((res) => {
    console.log(res)
    catArray = res
    setCategories(catArray)
  })
}

//reset Board 
function resetBoard(){
  let clueParent = document.getElementById('clue-board')
  while(clueParent.firstChild){
    clueParent.removeChild(clueParent.firstChild)
  }

  let catParent = document.getElementById('category-row')
  while (catParent.firstChild){
    catParent.removeChild(catParent.firstChild)
  }

  let score = document.getElementById('score')
  score.innerText = '0'

  initBoard()
  initCatRow()
}

//FIGURE OUT THE CLUE FOR THE ITEM THAT IS CLICKED

 function getClue(e) {
  //identifying the y coordinate of the target clicked (dollar value)
  const child = e.currentTarget 
  child.classList.add('clicked-box')
  const dollars = +e.target.textContent.substring(1)

  //identifying the y coordinate of the value clicked
  const parent = child.parentNode /*finding parent of the item clicked e.g. 200$ is first row so index 0*/

  const index = Array.prototype.findIndex.call(parent.children, (c) => c === child) /*finding the index of the item clicked in that parent*/

  const clueList = catArray[index].clues /*using that index to look through cluelist and find approriate category and pulling the clues which gives us an array of objects (clues)*/


  const itemClue = clueList.find(clue => clue.value === dollars) /*searching through that array and finding the clue that matches the y coordinate of item clicked (dollar amount)*/
  console.log(itemClue)
  showQuestion(itemClue, child, dollars)
}

//SHOW QUESTION TO USER AND GET THEIR ANSWER!
function showQuestion(itemClue, child, dollars){
    let userAnswer = prompt(itemClue.question).toLowerCase()
    let correctAnswer = itemClue.answer.toLowerCase().replace(/<\/?[^>]+(>|$)/g, '')
    let possiblePoints = dollars
    child.innerHTML = itemClue.answer
    child.removeEventListener('click', getClue)
    evaluateAnswer(userAnswer, correctAnswer, possiblePoints)
}

function evaluateAnswer(userAnswer, correctAnswer, possiblePoints){
  let checkAnswer = (userAnswer === correctAnswer) ? 'correct' : 'incorrect'
  let confirmAnswer = 
  confirm(`For $${possiblePoints}, you answered ${userAnswer}, and the correct answer was "${correctAnswer}". Your answer appears to be ${checkAnswer}. Click Ok to accept or click Cancel if the answer was not properly evaluated`)
  awardPoint(checkAnswer, confirmAnswer, possiblePoints)
}

//AWARD POINTS
function awardPoint(checkAnswer, confirmAnswer, possiblePoints){
  if(!(checkAnswer === 'incorrect' && confirmAnswer === true)){
    //award points
    let target = document.getElementById('score')
    let currentScore = +target.innerText
    currentScore += possiblePoints
    target.innerText = currentScore
  }else {
    alert('No points awarded')
  }
}


//GENERATE CATEGORIES and LOAD TO THE BOARD

function setCategories(catArray){
  let element = document.getElementById('category-row')
  let children = element.children
  for(let i = 0; i < children.length; i++){
    children[i].innerHTML = catArray[i].title
  }
}

//Need to now use click event on clue items  to trigger a clue, going to alert the clue and add an answer




