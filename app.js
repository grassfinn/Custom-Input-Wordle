let word = [];
//add words to an array
let addedArray = [];

let randomArr = (arr) => {
  //get random index
  const randomIndex = Math.floor(Math.random() * arr.length);
  //get random item
  const item = arr[randomIndex];
  return item;
};

// console.log(word);

//add words to an array

//
const wordContainer = document.getElementById('word-container');
wordContainer.addEventListener('click', (event) => {
  if (wordContainer.textContent === '') {
    return;
  } else {
    //grabbing the text content of the event
    let wordToRemove = event.target.textContent;

    addedArray = addedArray.filter((el) => el !== wordToRemove);
    console.log(`${wordToRemove} was deleted`);
    //clearing container
    wordContainer.textContent = '';
    addedArray.map((word) => {
      let li = document.createElement('li');
      li.textContent = word;
      wordContainer.appendChild(li);
    });
  }
});

const addTo = () => {
  if (userInput.value.length < 5) {
    return alert('Must be a five letter word.');
  } else {
    wordContainer.style.display = 'inline-block';

    console.log('clicked');
    addedArray.push(userInput.value);
    addedArray = addedArray.map((word) => word.toUpperCase());
    console.log(addedArray);
    //last item of the array sine we are pushing
    let li = document.createElement('li');
    li.textContent = addedArray[addedArray.length - 1];
    wordContainer.appendChild(li);
  }
};
const userInput = document.getElementById('userInput');
const submit = document.getElementById('submit');
submit.addEventListener('click', () => addTo());

//Play button
const play = () => {
  wordContainer.style.display = 'none';
  birds = addedArray.map((x) => x);
  console.log(`These are the items you added ${birds}`);
  word = randomArr(addedArray);
  console.log(word);

  const tile = document.querySelectorAll('.tile');
  const keyboard = document.querySelectorAll('.keyboard');

  // rowTiles.forEach((tile) => tile.classList.add('no-overlay'));
  tile.forEach((tile) =>
    tile.classList.remove(
      'green-overlay',
      'yellow-overlay',
      'grey-overlay',
      'flip'
    )
  );
  tile.forEach((tile) => (tile.textContent = ''));
  currentRow = 0;
  currentTile = 0;
  keyboard.forEach((key) =>
    key.classList.remove('green-overlay', 'yellow-overlay', 'grey-overlay')
  );
};

const playButton = document.getElementById('playButton');
playButton.addEventListener('click', () => play());

//uppercase an array through the .map() method

// const upperCaseBirds = word.map((item) => item.toUpperCase());
// console.log(upperCaseBirds);

//selecting the tile container div
const tileDisplay = document.querySelector('.tile-container');
//selecting the key container div
const keyboard = document.querySelector('.key-container');
//selecting the msg container div
const messageDisplay = document.querySelector('.msg-container');

let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

const keys = [
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'I',
  'O',
  'P',
  '<<',
  'A',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'ENTER',
  'Z',
  'X',
  'C',
  'V',
  'B',
  'N',
  'M',
];
const emptyRows = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
];
let guessRows = emptyRows;
//look at each guessRows
guessRows.forEach((guessRow, guessRowIndex) => {
  //create a div for each row
  const row = document.createElement('div');
  //setting the ID
  row.setAttribute('id', 'guessRow-' + guessRowIndex);
  //look at each tile
  guessRow.forEach((guess, guessIndex) => {
    //create a div for each tile
    const tileElement = document.createElement('div');
    //setting the id of the tiles
    tileElement.setAttribute(
      'id',
      'guessRow-' + guessRowIndex + '-tile-' + guessIndex
    );
    //giving the tile a class
    tileElement.classList.add('tile');
    //creating the row element in HTML
    row.append(tileElement);
  });
  //creating the tiles in HTML
  tileDisplay.append(row);
});

//creating a key button for each key that can be presssed
keys.forEach((key) => {
  //for each key create a button with the text of the key
  const button = document.createElement('button');
  button.textContent = key;

  //giving each key an id of its letter value
  button.setAttribute('id', key);
  button.classList.add('keyboard');
  //an event listener for clicks that runs the click handle
  button.addEventListener('click', () => handleClick(key));
  //Creating the keyboard
  keyboard.append(button);
});

const handleClick = (letter) => {
  //logging which key is being clicked
  console.log('clicked', letter);
  if (letter === '<<') {
    deleteLetter();
    console.log('guessRows', guessRows);
    return;
  }
  if (letter === 'ENTER') {
    checkRow();
    console.log('guessRows', guessRows);
    return;
  }
  addLetter(letter);
};

const addLetter = (letter) => {
  if (currentTile < 5 && currentRow < 6) {
    const tile = document.getElementById(
      'guessRow-' + currentRow + '-tile-' + currentTile
    );
    tile.textContent = letter;
    guessRows[currentRow][currentTile] = letter;
    tile.setAttribute('data', letter);
    currentTile++;
    console.log('guessRows', guessRows);
  }
};
const deleteLetter = (letter) => {
  if (currentTile > 0) {
    currentTile--;
    const tile = document.getElementById(
      'guessRow-' + currentRow + '-tile-' + currentTile
    );
    tile.textContent = '';
    guessRows[currentRow][currentTile] = '';
    tile.setAttribute('data', '');
  }
};

const checkRow = () => {
  const guess = guessRows[currentRow].join('');

  if (currentTile > 4) {
    console.log(`Guess is ${guess}, worlde is ${word}`);
    flipTile();
    if (word === guess) {
      showMessage('Noice!');
      isGameOver = true;
      return;
    } else {
      //if you are on your last row and get the word wrong. GAME OVER
      if (currentRow >= 5) {
        isGameOver = true;
        showMessage('Game Over');
        return;
      }
      // If the current row is less that five incriment over to the next row
      if (currentRow < 5) {
        currentRow++;
        //set current tile back to 0
        currentTile = 0;
      }
    }
  }
};

const showMessage = (message) => {
  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  messageDisplay.append(messageElement);
  setTimeout(() => messageDisplay.removeChild(messageElement), 1000);
};

const addColorToKey = (keyLetter, color) => {
  const key = document.getElementById(keyLetter);
  key.classList.add(color);
};

const flipTile = () => {
  const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes;
  let checkWord = word;
  const guess = [];

  rowTiles.forEach((tile) => {
    guess.push({ letter: tile.getAttribute('data'), color: 'grey-overlay' });
  });

  guess.forEach((guess) => {
    if (checkWord.includes(guess.letter)) {
      guess.color = 'yellow-overlay';
      checkWord = checkWord.replace(guess.letter, '');
    }
  });

  guess.forEach((guess, index) => {
    if (guess.letter == word[index]) {
      guess.color = 'green-overlay';
      checkWord = checkWord.replace(guess.letter, '');
    }
  });

  rowTiles.forEach((tile, index) => {
    setTimeout(() => {
      tile.classList.add('flip');
      tile.classList.add(guess[index].color);
      addColorToKey(guess[index].letter, guess[index].color);
    }, 500 * index);
  });
};
