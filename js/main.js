'use strict'

const MINE = '💥'
const EMPTY = ' '
const FLAG = '🚩'

var gBoard
var isStart

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    isFirstClick: true
}

var gLevel = {
    size: 4,
    mines: 2
}

function initGame() {
    gBoard = buildBoard()
    renderBoard(gBoard)
}

function buildBoard() {
    var board = [];
    for (var i = 0; i < gLevel.size; i++) {
        board[i] = []
        // board.push([]);
        for (var j = 0; j < gLevel.size; j++) {
            var cell = createCell()
            board[i][j] = cell
        }
    }
    // board[1][1].isMine = true
    // board[0][0].isMine = true
    console.table(board)
    // console.log('board', board)
    return board;
}

function createCell() {
    var cell = {

        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: true,
    }
    return cell
}

function renderBoard(board) {
    var strHTML = '<table border="2"><tbody>'

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]
            var mine = (currCell.isMine) ? MINE : EMPTY
            var cellClass = 'cell cell'
            // console.log('.cellClass', cellClass)
            strHTML += `<td onclick="cellClicked(${i},${j},this)" class="${cellClass}-${i}-${j}">${mine}</td>`

        }
        strHTML += '</tr>'
    }
    strHTML += '<t/body></table>'

    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}


function cellClicked(cellI, cellJ, elCell) {
    if (isStart === true) {
        counter()
        isStart = false
    }

    var clickedCell = gBoard[cellI][cellJ]
    clickedCell.isShown = false

    if (clickedCell.isMine) {
        elCell.style.backgroundColor = 'red'
        elCell.innerHTML = MINE
    }

    if (gGame.isFirstClick === true) {
        for (var i = 0; i < gLevel.mines; i++) {
            getMinesRandom()
        }
    }

    for (var i = 0; i <= gBoard.length - 1; i++) {
        for (var j = 0; j <= gBoard[0].length - 1; j++) {
            var minesCount = setMinesNegsCount(i, j, gBoard)
            var activeCell = gBoard[i][j]
            activeCell.minesAroundCount = minesCount
        }
    }

    elCell.innerHTML = clickedCell.minesAroundCount
}


function setMinesNegsCount(cellI, cellJ, gBoard) {
    var minesCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= gBoard[i].length) continue
            var count = gBoard[i][j]
            if (count.isMine) minesCount++
        }
    }
    console.log('minesCount', minesCount)
    return minesCount
}


function cellMarked(elCell) {

}
function expandShown(board, elCell, i, j) {

}

function getMinesRandom() {
    var i = getRandomInt(0, gBoard.length - 1)
    console.log('i', i)
    var j = getRandomInt(0, gBoard.length - 1)
    console.log('j', j)

    var currCell = gBoard[i][j]
    currCell.isMine = true


}


function beginner() {
    gLevel.size = 4, 2
    initGame()
}
function medium() {
    gLevel.size = 8, 12
    initGame()
}
function extreme() {
    gLevel.size = 12, 30
    initGame()
}

function counter() {
    timer = setInterval(stopWatch, 1000)
}

function stopCounter() {
    clearInterval(timer)
}

function stopWatch() {
    milSeconds++
    if (milSeconds / 1000 === 1) {
        milSeconds = 0
        seconds++
        console.log('g');

    }

    var elClock = document.querySelector('p')
    elClock.innerText = `${seconds}:${milSeconds}`
}

function getRandomInt(min, max) {
    var random = (Math.random() * (max - min + 1) + min)
    random = Math.floor(random)
    return random
}