'use strict'

const MINE = '💥'
const FLAG = '🚩'

var gBoard

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
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
        board.push([]);
        for (var j = 0; j < gLevel.size; j++) {
            var cell = createCell()
            board[i][j] = cell
        }
    }
    board[1][1].isMine = true
    board[0][0].isMine = true
    console.table(board)
    return board;
}

function createCell() {
    var cell = {

        minesAroundCount: 0,
        isShown: true,
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
            var mine = (currCell.isMine) ? MINE : ' '
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

negsCount(gGame.shownCount)
// console.log('negsCount', negsCount)
function negsCount(board) {
    console.log('board', board)
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var minesCount = setMinesNegsCount(i,j,gBoard)
            console.log('minesCount', minesCount)
            if (minesCount === 0) gBoard[i][j].minesAroundCount = ' '
            if(minesCount) gBoard[i][j].minesAroundCount = minesCount
            
        }
    }
    console.log('gGame.shownCount', gGame.isOn)
    return gGame.isOn
}

// setMinesNegsCount(gBoard)
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


function cellClicked(elCell, cellI, cellJ) {

    // if (gBoard[cellI][cellJ] === MINE) {

    // gBoard[cellI][cellJ] = ' '

    // elCell.innerText = ' '
    // }
}




function cellMarked(elCell) {

}
function expandShown(board, elCell, i, j) {

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

