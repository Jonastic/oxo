<script setup lang="ts">
</script>

<template>
  <div class="board">
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
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
      font-size: 32px;
      cursor: pointer;
    }

    .cell:hover {
      background-color: #eaeaea;
    }
</style>
