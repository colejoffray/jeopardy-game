//Initialize the game board on page load
initBoard()

function initBoard(){
  let board = document.getElementById('clue-board')
  //generate 5 rows, then place 6 boxes in each row
  for(let i = 0; i < 5; i++){
    let row = document.createElement('div')
    let boxValue = 200 * (i + 1)
    row.className = 'clue-row'

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

