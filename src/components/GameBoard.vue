<script setup lang="ts">
import { ref } from 'vue'
import { Player } from '../entities/player';
import { Cell } from '../entities/cell';
import { useScoreStore } from '../stores/score';

const score = useScoreStore();

const showOverlay = ref(false);
const winner = ref<'player' | 'computer' | 'draw' | null>(null);

const cells = ref<Cell[]>(Array.from({ length: 9 }, (_, i) => ({
  index: i,
  playerIndex: null
})));
const players = ref([
  new Player('Player', 'X', '#2196F3'),
  new Player('Computer', 'O', '#FF5722')
]);
let currentPlayerIndex = ref(0);

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleClick(index: number) {
  const cell = cells.value[index];
  if (cell.playerIndex) return;

  cell.playerIndex = currentPlayerIndex.value;

  if (checkWinner()) {
    endGame(currentPlayerIndex.value === 0 ? 'player' : 'computer');

    return
  }

  if (cells.value.every(cell => cell.playerIndex !== null)) {
    endGame('draw');

    return
  }

  currentPlayerIndex.value = 1 - currentPlayerIndex.value;

  if (currentPlayerIndex.value === 1) {
    chooseForComputer();
  }
}

function endGame(winnerType: 'player' | 'computer' | 'draw') {
  winner.value = winnerType
  showOverlay.value = true

  if (winnerType === 'player') {
    score.addWin();
  } else if (winnerType === 'computer') {
    score.addLoss();
  } else {
    score.addDraw();
  }
}

function nextGame() {
  cells.value.forEach(cell => {
     cell.playerIndex = null;
  });

  currentPlayerIndex.value = 0;
  showOverlay.value = false
  winner.value = null
}

function chooseForComputer() {
  const availableCells = cells.value.filter((cell) => cell.playerIndex === null);
  const availableCellIndex = Math.floor(Math.random() * availableCells.length);
  
  handleClick(availableCells[availableCellIndex].index);
}

function checkWinner(): boolean {
  return winningCombinations.some(([a, b, c]) => {
    return (
      cells.value[a].playerIndex === currentPlayerIndex.value &&
      cells.value[b].playerIndex === currentPlayerIndex.value &&
      cells.value[c].playerIndex === currentPlayerIndex.value
    );
  });
}
</script>

<template>
  <transition name="fade">
    <div 
      v-if="showOverlay" 
      class="overlay"
    >
      <div class="overlay-content">
        <template v-if="winner === 'player'">
          <div>🧑‍💻</div>
          <div>Player wins!</div>
        </template>
        <template v-else-if="winner === 'computer'">
          <div>🤖</div>
          <div>Computer wins!</div>
        </template>
        <template v-else>
          <div>🤝</div>
          <div>It's a draw!</div>
        </template>

        <button @click="nextGame">▶ Next Game</button>
      </div>
    </div>
  </transition>

  <div class="board">
    <div 
      v-for="(cell, index) in cells" 
      :key="index" 
      class="cell" 
      :class="{ taken: cell.playerIndex !== null }"
      @click="handleClick(index)"
    >
      <span v-if="cell.playerIndex !== null" :style="`color: ${players[cell.playerIndex].color}`">
        {{ players[cell.playerIndex].letter }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.board {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 5px;
  padding: 5px;
}

.cell {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ccc;
  font-size: 48px;
  cursor: pointer;
}

.cell:hover {
  background-color: #eaeaea;
}

.cell.taken {
  pointer-events: none;
}

.overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.overlay-content {
  background: white;
  color: #242424;
  padding: 2rem 3rem;
  border-radius: 1rem;
  text-align: center;
  font-size: 1.5rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
}

button {
  margin-top: 1rem;
  font-size: 1.1rem;
  padding: 0.6rem 1.2rem;
  border: none;
  background-color: #4caf50;
  color: white;
  border-radius: 0.5rem;
  cursor: pointer;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
