<template>
  <div class="info-bar">
    <div class="info-item">
      <span class="info-label">邪恶点数</span>
      <span class="info-value evil">{{ store.data.evil_points }}</span>
      <div class="info-controls">
        <button class="ctrl-btn small" type="button" @click="adjustEvil(-10)">-10</button>
        <button class="ctrl-btn small" type="button" @click="adjustEvil(-50)">-50</button>
        <button class="ctrl-btn small" type="button" @click="adjustEvil(50)">+50</button>
        <button class="ctrl-btn small" type="button" @click="adjustEvil(10)">+10</button>
      </div>
    </div>
    <div class="info-item">
      <span class="info-label">日期</span>
      <span class="info-value">第{{ store.data.date }}天</span>
      <div class="info-controls">
        <button class="ctrl-btn" type="button" @click="store.data.date = Math.max(1, store.data.date - 1)">-</button>
        <button class="ctrl-btn" type="button" @click="store.data.date = Math.min(999, store.data.date + 1)">+</button>
      </div>
    </div>
    <div class="info-item">
      <span class="info-label">位置</span>
      <select v-model="store.data.location" class="loc-select">
        <option v-for="loc in locations" :key="loc" :value="loc">{{ loc }}</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

const locations = ['王都', '边境', '魔王领', '森林', '温泉乡', '雪山'];

function adjustEvil(delta: number) {
  store.data.evil_points = Math.max(0, store.data.evil_points + delta);
}
</script>

<style lang="scss" scoped>
.info-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background: var(--c-card);
  border-bottom: 1px solid var(--c-border);
  flex-wrap: wrap;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.info-label {
  font-size: 0.72rem;
  color: var(--c-text2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--c-text);
  min-width: 40px;
  text-align: center;

  &.evil {
    color: var(--c-accent);
  }
}

.info-controls {
  display: flex;
  gap: 3px;
}

.ctrl-btn {
  padding: 1px 6px;
  border: 1px solid var(--c-border);
  border-radius: 3px;
  background: var(--c-surface);
  color: var(--c-text2);
  font-size: 0.7rem;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: var(--c-accent3);
    color: var(--c-text);
  }

  &.small {
    padding: 1px 4px;
    font-size: 0.65rem;
  }
}

.loc-select {
  background: var(--c-surface);
  border: 1.5px solid var(--c-border);
  border-radius: 4px;
  color: var(--c-text);
  padding: 2px 6px;
  font-size: 0.8rem;
  font-family: inherit;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: var(--c-accent3);
  }
}
</style>
