<script setup lang="ts">
import GameBoard from './components/GameBoard.vue';
import { useScoreStore } from './stores/score';

const score = useScoreStore();

</script>

<template>
  <header>
    <h1>TicTacToe</h1>
  </header>

  <main>
    <GameBoard />
  </main>

  <footer>
    <span title="Wins">✅ {{ score.wins }}</span> 
    <span title="Current streak">🔥 {{ score.currentStreak }}</span> 
    <span title="Max streak">🏆 {{ score.maxStreak }}</span> 
    <span title="Losses">❌ {{ score.losses }}</span>
    <span title="Draws">🟰 {{ score.draws }}</span>
  </footer>
</template>
