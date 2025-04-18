<script setup lang="ts">
import GameBoard from './components/GameBoard.vue';
import StatusBar from './components/StatusBar.vue';
</script>

<template>
  <header>
      <h1 class="title">TicTacToe</h1>
  </header>

  <main>
    <GameBoard />
  </main>

  <footer>
    <StatusBar />
  </footer>
</template>
