<template>
  <div class="origin-panel">
    <div class="section-head">出身选择</div>
    <div class="origin-options">
      <label
        v-for="opt in originOptions"
        :key="opt.id"
        class="origin-option"
        :class="{ active: store.data.user_origin === opt.id }"
      >
        <input
          v-model="store.data.user_origin"
          type="radio"
          :value="opt.id"
          class="radio-input"
        />
        <span class="radio-label">
          <span class="opt-title">{{ opt.label }}</span>
          <span class="opt-desc">{{ opt.desc }}</span>
        </span>
      </label>
    </div>
    <div class="name-row">
      <span class="name-label">{{ store.data.user_origin === 'six' ? '本名/称呼' : '名字/代号' }}</span>
      <input
        v-model="store.data.user_codename"
        type="text"
        class="name-input"
        maxlength="20"
      />
    </div>
    <div v-if="store.data.user_origin === 'six'" class="hint">
      「六号」是你的组织代号，日常中同伴会用你的本名称呼你
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

const originOptions = [
  { id: 'six', label: '战斗员六号', desc: '你就是原作主角，如月精英战斗员' },
  { id: 'partner', label: '如月第三搭档', desc: '原创角色，与六号、爱丽丝同行' },
  { id: 'local', label: '异世界本地人', desc: '本地视角，偶遇如月派遣队' },
];
</script>

<style lang="scss" scoped>
.origin-panel {
  padding: 10px 12px;
  border-bottom: 1px solid var(--c-border);
  background: var(--c-deep);
}

.section-head {
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--c-accent);
  margin-bottom: 8px;
  font-weight: 600;
}

.origin-options {
  display: flex;
  gap: 6px;
  margin-bottom: 10px;
}

.origin-option {
  flex: 1;
  display: flex;
  align-items: flex-start;
  padding: 8px;
  border: 1.5px solid var(--c-border);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  background: var(--c-surface);

  &:hover {
    border-color: var(--c-accent3);
  }

  &.active {
    border-color: var(--c-accent);
    background: rgba(233, 69, 96, 0.08);
  }
}

.radio-input {
  display: none;
}

.radio-label {
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
}

.opt-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--c-text);
}

.opt-desc {
  font-size: 0.72rem;
  color: var(--c-text2);
  line-height: 1.3;
}

.name-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.name-label {
  font-size: 0.78rem;
  color: var(--c-text2);
  white-space: nowrap;
}

.name-input {
  flex: 1;
  background: var(--c-surface);
  border: 1.5px solid var(--c-border);
  border-radius: 4px;
  color: var(--c-text);
  padding: 4px 8px;
  font-size: 0.85rem;
  font-family: inherit;
  outline: none;

  &:focus {
    border-color: var(--c-accent3);
  }
}

.hint {
  margin-top: 6px;
  font-size: 0.72rem;
  color: var(--c-accent2);
  font-style: italic;
}
</style>
