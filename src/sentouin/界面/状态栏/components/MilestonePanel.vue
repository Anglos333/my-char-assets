<template>
  <div class="milestone-panel">
    <div class="section-desc">控制世界书条目激活状态，影响角色认知和信息可用范围</div>
    <div class="milestone-list">
      <label
        v-for="ms in milestones"
        :key="ms.key"
        class="milestone-item"
        :class="{ locked: !ms.unlocked }"
      >
        <input
          v-model="store.data[ms.key]"
          type="checkbox"
          class="ms-checkbox"
        />
        <span class="ms-name">{{ ms.label }}</span>
        <span class="ms-desc">{{ ms.desc }}</span>
      </label>
    </div>
    <div class="reset-section">
      <button class="reset-btn" type="button" @click="resetMilestones">重置全部里程碑</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

const milestones = [
  { key: 'milestone_arrived', label: '降临异世界', desc: '来到这个世界的基础事件', unlocked: true },
  { key: 'milestone_joined_葛瑞丝', label: '加入葛瑞丝', desc: '与王国建立正式关系', unlocked: true },
  { key: 'milestone_first_battle', label: '首战魔王军', desc: '首次与魔王军正面交战', unlocked: true },
  { key: 'milestone_met_海涅', label: '与海涅交锋', desc: '遭遇炎之四天王海涅', unlocked: false },
  { key: 'milestone_温泉乡', label: '温泉乡事件', desc: '小队抵达温泉乡', unlocked: false },
  { key: 'milestone_海涅_转向', label: '海涅转向', desc: '海涅从敌对转为友方', unlocked: false },
  { key: 'milestone_钨丝_到来', label: '钨丝到来', desc: '钨丝首次出现在异世界', unlocked: false },
  { key: 'milestone_钨丝_暴露', label: '钨丝暴露', desc: '钨丝的监视任务被揭露', unlocked: false },
  { key: 'milestone_罗素_和平', label: '和平提案', desc: '罗素提出和平共存方案', unlocked: false },
  { key: 'milestone_魔王军_分裂', label: '魔王军分裂', desc: '魔王军内部出现公开分歧', unlocked: false },
  { key: 'milestone_final_battle', label: '最终决战', desc: '最终决战发生', unlocked: false },
  { key: 'milestone_归属选择', label: '归属选择', desc: '做出最终归属/去向选择', unlocked: false },
];

function resetMilestones() {
  for (const ms of milestones) {
    if (ms.unlocked) {
      store.data[ms.key] = true;
    } else {
      store.data[ms.key] = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.milestone-panel {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.section-desc {
  font-size: 0.72rem;
  color: var(--c-text2);
  font-style: italic;
  line-height: 1.4;
}

.milestone-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.milestone-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border: 1px solid var(--c-border);
  border-radius: 4px;
  background: var(--c-deep);
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: var(--c-accent3);
  }

  &.locked {
    .ms-checkbox:not(:checked) {
      + .ms-name {
        color: var(--c-text2);
      }
    }
  }
}

.ms-checkbox {
  appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid var(--c-border);
  border-radius: 3px;
  background: var(--c-surface);
  display: grid;
  place-content: center;
  flex-shrink: 0;
  cursor: pointer;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 1px;
    transform: scale(0);
    transition: transform 0.12s ease;
    background: var(--c-accent);
  }

  &:checked::before {
    transform: scale(1);
  }

  &:checked {
    border-color: var(--c-accent);
  }
}

.ms-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--c-text);
  min-width: 80px;
}

.ms-desc {
  font-size: 0.7rem;
  color: var(--c-text2);
  flex: 1;
}

.reset-section {
  display: flex;
  justify-content: flex-end;
  padding-top: 4px;
}

.reset-btn {
  padding: 4px 12px;
  border: 1px solid var(--c-border);
  border-radius: 4px;
  background: var(--c-surface);
  color: var(--c-text2);
  font-size: 0.72rem;
  font-family: inherit;
  cursor: pointer;

  &:hover {
    border-color: var(--c-danger);
    color: var(--c-danger);
  }
}
</style>
