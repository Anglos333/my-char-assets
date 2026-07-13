<template>
  <div class="card">
    <OriginPanel />
    <UserInfoBar />
    <TabNav v-model="active_tab" :tabs="tabs" />
    <div v-if="active_tab" class="content-area">
      <div v-if="active_tab === 'characters'" class="tab-pane active">
        <CharacterList />
      </div>
      <div v-else-if="active_tab === 'milestones'" class="tab-pane active">
        <MilestonePanel />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import OriginPanel from './components/OriginPanel.vue';
import UserInfoBar from './components/UserInfoBar.vue';
import CharacterList from './components/CharacterList.vue';
import MilestonePanel from './components/MilestonePanel.vue';
import TabNav from './components/TabNav.vue';

const tabs = [
  { id: 'characters', label: '角色状态' },
  { id: 'milestones', label: '剧情进度' },
];

const active_tab = useLocalStorage<string | null>('sentouin:active_tab', null);
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  max-width: 680px;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
}

.content-area {
  padding: 10px 12px;
  min-height: 0;
}

.tab-pane {
  display: none;
  animation: fadeEffect 0.3s;
}

.tab-pane.active {
  display: block;
}

@keyframes fadeEffect {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
