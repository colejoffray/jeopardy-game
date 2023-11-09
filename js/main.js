//Initialize the game board on page load
initBoard()
initCatRow()


function initCatRow(){
  let catRow = document.getElementById('category-row')
  for(let i = 0; i < 6; i++){
    let catItem = document.createElement('div')
    catItem.className = 'clue-box category-box'
    catRow.appendChild(catItem)
  }
}


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
      box.addEventListener('click', getClue, false)
      row.appendChild(box)
    }


    board.appendChild(row)

  }
}

function randomInt(){
  return Math.floor(Math.random() * (18418) + 1)
}

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
  })
}

 function getClue() {
  console.log('hello world')
}



//Example fetch using pokemonapi.co
// document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  const choice = document.querySelector('input').value
  const url = `https://api.nasa.gov/planetary/apod?api_key=sfyst2WypPxQr4I6EsFE3mY4OCwAskdHt9af8etG&date=${choice}`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        let iFrame = document.querySelector('iframe')
        let img = document.querySelector('img')
        if(data.media_type === 'image'){
          img.src = data.url 
          iFrame.src = null
        }else if(data.media_type === 'video') {
          document.querySelector('iframe').src = data.url
          img.src = null
        }else {
          console.log('error')
        }
        document.querySelector('h3').innerText = data.explanation
        console.log(data)
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

