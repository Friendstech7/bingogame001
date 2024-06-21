
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function generateBingoBoard() {
    const board = [];

    const ranges = [
        Array.from({ length: 5 }, (_, i) => i + 1),   // Row B: 1-5
        Array.from({ length: 5 }, (_, i) => i + 6),   // Row I: 6-10
        Array.from({ length: 5 }, (_, i) => i + 11),  // Row N: 11-15
        Array.from({ length: 5 }, (_, i) => i + 16),  // Row G: 16-20
        Array.from({ length: 5 }, (_, i) => i + 21)   // Row O: 21-25
    ];

    ranges.forEach(range => shuffle(range));

    for (let i = 0; i < 5; i++) {
        const row = [];
        for (let j = 0; j < 5; j++) {
            if (i === 2 && j === 2) {
                row.push('FREE');
            } else {
                row.push(ranges[i][j]);
            }
        }
        board.push(row);
    }

    return board;
}

function transposeBoard(board) {
    const transposedBoard = [];

    for (let i = 0; i < 5; i++) {
        const row = [];
        for (let j = 0; j < 5; j++) {
            row.push(board[j][i]);
        }
        transposedBoard.push(row);
    }

    return transposedBoard;
}

function renderBingoBoard(board) {
    const boardContainer = document.createElement('div');
    boardContainer.classList.add('bingo-board', 'shadow-sm', 'rounded', 'mb-4');
    
    const headers = ['B', 'I', 'N', 'G', 'O'];
    const headerClasses = ['header-b', 'header-i', 'header-n', 'header-g', 'header-o'];
    headers.forEach((header, index) => {
        const headerCell = document.createElement('div');
        headerCell.textContent = header;
        headerCell.classList.add('header', headerClasses[index]);
        boardContainer.appendChild(headerCell);
    });

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const cellElement = document.createElement('div');
            cellElement.textContent = board[i][j];
            if (board[i][j] === 'FREE') {
                cellElement.classList.add('free');
            }
            boardContainer.appendChild(cellElement);
        }
    }

    return boardContainer;
}

document.addEventListener('DOMContentLoaded', () => {
    const boardSelectContainer = document.getElementById('board-select-container');
    const boardButtonsContainer = document.getElementById('board-buttons-container');

    let boards = localStorage.getItem('bingo_boards');
    if (!boards) {
        boards = [];
        for (let i = 0; i < 100; i++) {
            const board = generateBingoBoard();
            boards.push(board);
        }
        localStorage.setItem('bingo_boards', JSON.stringify(boards));
    } else {
        boards = JSON.parse(boards);
    }
    boards.forEach((board, index) => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = board-${index + 1};
        checkbox.value = index;
        const label = document.createElement('label');
        label.setAttribute('for', board-${index + 1});
        label.textContent = index + 1;
        boardSelectContainer.appendChild(checkbox);
        boardSelectContainer.appendChild(label);

        const button = document.createElement('button');
        button.textContent = Board ${index + 1};
        button.classList.add('btn', 'btn-outline-primary');
        button.addEventListener('click', () => {
            checkbox.checked = !checkbox.checked;
        });
        boardButtonsContainer.appendChild(button);
    });

    document.getElementById('play-button').addEventListener('click', () => {
        const checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        const selectedIndices = Array.from(checkedCheckboxes).map(cb => parseInt(cb.value, 10));


if (selectedIndices.length > 0) {
            localStorage.setItem('selected_bingo_boards', JSON.stringify(selectedIndices));
            window.location.href = 'selection.html';
        } else {
            alert('No board selected. Please select at least one board.');
        }
    });
});