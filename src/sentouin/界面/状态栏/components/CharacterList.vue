<template>
  <div class="char-list">
    <div v-for="char in characterList" :key="char.key" class="char-card">
      <div class="char-header">
        <span class="char-name">{{ char.name }}</span>
        <span class="char-stage" :class="'stage-' + char.stageClass">{{ store.data.阶段[char.key] }}</span>
      </div>
      <div class="affinity-row">
        <span class="aff-label">好感度</span>
        <div class="aff-track">
          <div class="aff-fill" :style="{ width: store.data.好感度[char.key] + '%' }"></div>
        </div>
        <span class="aff-value">{{ store.data.好感度[char.key] }}</span>
        <div class="aff-btns">
          <button class="aff-btn" type="button" @click="adjustAff(char.key, -5)">-5</button>
          <button class="aff-btn" type="button" @click="adjustAff(char.key, -1)">-1</button>
          <button class="aff-btn" type="button" @click="adjustAff(char.key, 1)">+1</button>
          <button class="aff-btn" type="button" @click="adjustAff(char.key, 5)">+5</button>
        </div>
      </div>
      <div class="char-detail" v-if="char.detail">
        {{ char.detail }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';
import _ from 'lodash';

const store = useDataStore();

const characterList = [
  { key: '爱丽丝', name: '如月爱丽丝', stageClass: 'alice', detail: '毒舌拜金但暗中保护你的搭档安卓' },
  { key: '雪诺', name: '雪诺·阿尔卡纳', stageClass: 'snow', detail: '没落贵族的前骑士团长，守财奴兼苦劳人' },
  { key: '萝丝', name: '萝丝', stageClass: 'rose', detail: '吃货奇美拉少女，全队最强战力' },
  { key: '格琳', name: '格琳·格里莫瓦尔', stageClass: 'grimm', detail: '轮椅上的高位诅咒师，相爱失败28次' },
  { key: '海涅', name: '海涅·弗雷姆', stageClass: 'heine', detail: '炎之四天王，傲娇苦劳人，你的酒友' },
  { key: '钨丝', name: '钨丝', stageClass: 'tungsten', detail: '完美妹妹型督察安卓，从监视到真心' },
];

function adjustAff(charKey: string, delta: number) {
  store.data.好感度[charKey] = _.clamp(store.data.好感度[charKey] + delta, 0, 100);
}
</script>

<style lang="scss" scoped>
.char-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.char-card {
  border: 1.5px solid var(--c-border);
  border-radius: 6px;
  padding: 8px 10px;
  background: var(--c-deep);
}

.char-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.char-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--c-text);
}

.char-stage {
  font-size: 0.68rem;
  padding: 1px 6px;
  border-radius: 3px;
  font-weight: 500;

  &.stage-alice { background: rgba(233, 69, 96, 0.15); color: var(--c-accent); }
  &.stage-snow { background: rgba(0, 180, 216, 0.15); color: var(--c-accent3); }
  &.stage-rose { background: rgba(240, 165, 0, 0.15); color: var(--c-accent2); }
  &.stage-grimm { background: rgba(155, 89, 182, 0.15); color: #9b59b6; }
  &.stage-heine { background: rgba(46, 204, 113, 0.15); color: var(--c-success); }
  &.stage-tungsten { background: rgba(241, 196, 15, 0.15); color: #f1c40f; }
}

.affinity-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.aff-label {
  font-size: 0.65rem;
  color: var(--c-text2);
  text-transform: uppercase;
  width: 36px;
}

.aff-track {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: var(--c-border);
  overflow: hidden;
}

.aff-fill {
  height: 100%;
  border-radius: 3px;
  background: linear-gradient(90deg, var(--c-accent), var(--c-accent2));
  transition: width 0.3s ease;
}

.aff-value {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--c-accent2);
  min-width: 24px;
  text-align: center;
}

.aff-btns {
  display: flex;
  gap: 2px;
}

.aff-btn {
  padding: 1px 5px;
  border: 1px solid var(--c-border);
  border-radius: 3px;
  background: var(--c-surface);
  color: var(--c-text2);
  font-size: 0.65rem;
  font-family: inherit;
  cursor: pointer;

  &:hover {
    border-color: var(--c-accent3);
    color: var(--c-text);
  }
}

.char-detail {
  margin-top: 4px;
  font-size: 0.7rem;
  color: var(--c-text2);
  font-style: italic;
}
</style>
