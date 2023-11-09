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

//alert the clue
 function getClue(e) {
  const child = e.currentTarget 
  child.classList.add('clicked-box')
  const dollars = +e.target.textContent.substring(1)
  const parent = child.parentNode
  const index = Array.prototype.findIndex.call(parent.children, (c) => c === child)
  let clueList = catArray[index].clues
  console.log(clueList)
  let itemClue = clueList.find(clue => clue.value === dollars)
  console.log(itemClue.question)
  alert(itemClue.question)
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




