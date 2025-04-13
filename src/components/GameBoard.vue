<script setup lang="ts">
import { ref } from 'vue'
import { Player } from '../entities/player';
import { Cell } from '../entities/cell';

const cells = ref<Cell[]>(Array.from({ length: 9 }, () => ({
  playerIndex: null
})))
const players = ref([
  new Player('Player', 'X', '#2196F3'),
  new Player('Computer', 'O', '#FF5722')
])
let currentPlayerIndex = ref(0)

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
  const cell = cells.value[index]
  if (cell.playerIndex) return

  const currentPlayer = players.value[currentPlayerIndex.value];

  cell.playerIndex = currentPlayerIndex.value;

  if (checkWinner()) {
    alert(`${currentPlayer.name} wins!`)
    return
  }

  if (cells.value.every(cell => cell.playerIndex !== null)) {
    alert("It's a draw!")
    return
  }

  currentPlayerIndex.value = 1 - currentPlayerIndex.value;
}

function checkWinner(): boolean {
  return winningCombinations.some(([a, b, c]) => {
    return (
      cells.value[a].playerIndex === currentPlayerIndex.value &&
      cells.value[b].playerIndex === currentPlayerIndex.value &&
      cells.value[c].playerIndex === currentPlayerIndex.value
    )
  })
}
</script>

<template>
  <div class="board">
    <div 
      v-for="(cell, index) in cells"
      :key="index"
      class="cell"
      :class="{ taken: cell.playerIndex !== null }"
      @click="handleClick(index)"
    >
      <span
        v-if="cell.playerIndex !== null"
        :style="`color: ${players[cell.playerIndex].color}`"
      >
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
</style>
