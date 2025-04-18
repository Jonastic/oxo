<script setup lang="ts">
import { ref } from 'vue'
import { Player } from '../entities/player';
import { Board } from '../entities/board';
import { useScoreStore } from '../stores/score';
import { AI } from '../entities/ai';

const score = useScoreStore();

const showOverlay = ref(false);
const winner = ref<'player' | 'computer' | 'draw' | null>(null);

const board = ref<Board>(new Board());
const players = ref([
  new Player('Player', 'X', '#3b82f6'),
  new Player('Computer', 'O', '#ef4444')
]);
const currentPlayerIndex = ref(0);
const clickedCellIndex = ref<number | null>(null);

function handleClick(index: number) {
  const cell = board.value.cells[index];
  if (cell.playerIndex) return;

  cell.playerIndex = currentPlayerIndex.value;

  clickedCellIndex.value = index;

  setTimeout(() => {
    clickedCellIndex.value = null;
  }, 200)

  if (board.value.hasWon(currentPlayerIndex.value)) {
    endGame(currentPlayerIndex.value === 0 ? 'player' : 'computer');

    return
  }

  if (board.value.isFull()) {
    endGame('draw');

    return
  }

  currentPlayerIndex.value = 1 - currentPlayerIndex.value;

  if (currentPlayerIndex.value === 1) {
    setTimeout(() => {
      chooseForComputer()
    }, 500)
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
  board.value.reset();

  currentPlayerIndex.value = 0;
  showOverlay.value = false
  winner.value = null
}

function chooseForComputer() {
  const ai = new AI(board.value.cells);
  const cell = ai.determineNextMove()
  
  handleClick(cell.index);
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

  <div 
    class="board"
    :class="{'disabled': currentPlayerIndex === 1}"
  >
    <div 
      v-for="(cell, index) in board.cells" 
      :key="index" 
      class="cell" 
      :class="{ taken: cell.playerIndex !== null, clicked: clickedCellIndex === index }"
      :style="cell.playerIndex !== null ? {backgroundColor:players[cell.playerIndex].color} : null"
      @click="handleClick(index)"
    >
      <span v-if="cell.playerIndex !== null">
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

.board.disabled {
  pointer-events: none;
}

.cell {
  position: relative;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  font-size: 64px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.1s ease, box-shadow 0.2s ease;
  transition: background-color 0.3s ease, transform 0.1s ease;
  color: white;
}

.cell:hover {
  background-color: #eaeaea;
}

.cell.taken {
  pointer-events: none;
}

.cell.clicked {
  animation: clickBounce 0.2s ease;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

@keyframes clickBounce {
  0% { transform: scale(1); }
  50% { transform: scale(0.9); }
  100% { transform: scale(1); }
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
