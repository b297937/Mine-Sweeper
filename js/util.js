'use strict'

function copyMat(mat) {
    var newMat = [];
    for (var i = 0; i < mat.length; i++) {
        newMat[i] = [];
        for (var j = 0; j < mat[0].length; j++) {
            newMat[i][j] = mat[i][j];
        }
    }
    return newMat;
}

function getRandomInt(min, max) {
    var random = (Math.random() * (max - min + 1) + min)
    random = Math.floor(random)
    return random
}


function countWordApperances(txt) {
    var words = txt.split(' ')
    var wordsCount = {}
    for (var i = 0; i < words.length; i++) {
        var word = words[i]
        wordsCount[word] = wordsCount[word] ? wordsCount[word] + 1 : 1
    }
    return wordsCount
}

function getTime() {
    return new Date().toString().split(' ')[4];
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
// array
function shuffle(array) {
    var arr = array.slice()
    var ans = [];
    for (var i = 0; i < array.length; i++) {
        var idx = getRandomInt(0, arr.length - 1)
        ans.push(arr.splice(idx, 1));
    }
    // console.log('array', arr)
    return ans
}
//matrix
function shuffle(array) {
    var currentIndex = array.length
    var randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}


function createNums() {
    // debugger
    var board = []
    for (var i = 0; i < gBoardSize ** 2; i++) {
        board.push(i + 1)
    }
    return board
}

function drawNum() {
    return gNums.pop()

}

// updatTime()
// console.log('updatTime', updatTime)
const startMinuts = 10
var time = startMinuts * 60

function updatTime() {
    var countDownEl = document.getElementById('countdown')
    const minutes = Math.floor(time / 60)
    let seconds = time % 60

    seconds = seconds < 10 ? '0' + seconds : seconds

    countDownEl.innerHTML = `${minutes}: ${seconds}`
    time--
}


gTotalSecTime = 0
var minutes = Math.floor(gTotalSecTime / 60) + ''
var seconds = gTotalSecTime - (minutes * 60) + ''

function rendClock() {
    gTotalSecTime++
    var minutes = Math.floor(gTotalSecTime / 60) + ''
    var seconds = gTotalSecTime - (minutes * 60) + ''
    var elGameTime = document.querySelector('.counttime')
    elGameTime.innerText = ` counttime:
    ${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`
}

// var elWatch
function stopWatch() {
    milSeconds++
    if (milSeconds / 1000 === 1) {
        milSeconds = 0
        seconds++
        
    }

    var elClock = document.querySelector('p')
    elClock.innerText = `${seconds}:${milSeconds}`
}

function buildBoard() {
    var board = [];
    for (var i = 0; i < gLevel.size; i++) {
      board.push([]);
      for (var j = 0; j < gLevel.size; j++) {
        var cell = createCell()
        board[i][j] = cell
      }
    }
  
    console.table(board)
    return board;
  }
  
  function blowUpNegs(cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= gBoard[i].length) continue;

            if (gBoard[i][j] === LIFE) {
                //model
                gBoard[i][j] = ''
                // dom
                renderCell(i, j, '')
            }

        }
    }
}
  // function createCell() {
//     var cell = {
  
//       minesAroundCount: 0,
//       isShown: false,
//       isMine: false,
//       isMarked: false,
//       innerStr: '',
  
//     }
//     return cell
//   }


// negsCount(gGame.shownCount)
// // console.log('negsCount', negsCount)
// function negsCount(board) {
//     console.log('board', board)
//     for (var i = 0; i < board.length; i++) {
//         for (var j = 0; j < board[0].length; j++) {
//             var minesCount = setMinesNegsCount(i, j, gBoard)
//             console.log('minesCount', minesCount)
//             if (minesCount === 0) gBoard[i][j].minesAroundCount = ''
//             if (minesCount) gBoard[i][j].minesAroundCount = minesCount

//         }
//     }
//     console.log('gGame.shownCount', gGame.isOn)
//     return gGame.isOn
// }

// function setMines() {
    //     var i = getRandomInt(0, gBoard.length - 1)
    //     console.log('i', i)
    //     var j = getRandomInt(0, gBoard.length - 1)
    //     console.log('j', j)
    // }


    function cellClicked(elCell, cellI, cellJ) {
        console.log('clickedCell', clickedCell)
    
    
        var clickedCell = gBoard[cellI][cellJ]
        clickedCell.isShown = true
    
        for (var i = 0; gBoard.length - 1; i++) {
            for (var j = 0; j <= gBoard[i].length - 1; j++) {
                var minesCount = setMinesNegsCount(i, j, gBoard)
                var activeCell = gBoard[i][j]
                activeCell.minesAroundCount = minesCount
            }
        }
    
        elCell.innerHTML = clickedCell.minesAroundCount
    }