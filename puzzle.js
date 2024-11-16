document.getElementById('start-game').addEventListener('click', () => {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('puzzle-game').style.display = 'block';
});

const pieces = document.querySelectorAll('.puzzle-piece');
const slots = document.querySelectorAll('.puzzle-slot');
const result = document.getElementById('result');
let correctPieces = 0;

pieces.forEach(piece => {
    piece.addEventListener('dragstart', dragStart);
});

slots.forEach(slot => {
    slot.addEventListener('dragover', dragOver);
    slot.addEventListener('drop', drop);
});

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.piece);
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const pieceId = e.dataTransfer.getData('text/plain');
    const piece = document.querySelector(`.puzzle-piece[data-piece="${pieceId}"]`);

    // Solo permite colocar la pieza correcta en el slot correspondiente
    if (e.target.dataset.slot === piece.dataset.piece && !e.target.hasChildNodes()) {
        e.target.appendChild(piece);
        correctPieces++;
        if (correctPieces === pieces.length) {
            showCompleteImage();
        }
    }
}

function showCompleteImage() {
    result.innerHTML = '<img src="images/complete.png" alt="Rompecabezas completo" class="complete-image">';
    result.style.textAlign = 'center';
}

document.getElementById('reset-button').addEventListener('click', () => {
    slots.forEach(slot => slot.innerHTML = '');
    const piecesContainer = document.getElementById('pieces');
    pieces.forEach(piece => piecesContainer.appendChild(piece));
    correctPieces = 0;
    result.innerHTML = '';
});
