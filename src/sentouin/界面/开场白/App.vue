<template>
  <div class="p-5 max-w-lg mx-auto font-sans">
    <div class="text-center mb-6">
      <div class="inline-block px-3 py-1 text-[10px] tracking-[0.2em] text-cyan-400/70 border border-cyan-400/15 rounded-full mb-3">
        如月 · 先遣任务档案
      </div>
      <h1 class="text-2xl font-bold text-white mb-1 tracking-wide">《战斗员派遣中！》</h1>
      <div class="text-cyan-300/50 text-xs tracking-[0.15em]">—— 如月异世界侵略计划 ——</div>
    </div>

    <template v-if="!confirmed">
      <div class="mb-5">
        <div class="flex items-center gap-2 mb-3">
          <div class="w-1 h-4 bg-cyan-500 rounded-full"></div>
          <span class="text-gray-300 text-sm font-medium">确认身份 · 选择你的任务档案</span>
        </div>
        <div class="grid gap-3">
          <div
            v-for="option in identityOptions"
            :key="option.value"
            :class="[
              'relative p-4 rounded-lg cursor-pointer transition-all duration-200 border overflow-hidden',
              selectedOrigin === option.value
                ? 'border-cyan-400 bg-cyan-400/10 shadow-[0_0_12px_rgba(34,211,238,0.08)]'
                : 'border-slate-600/40 bg-slate-800/60 hover:border-slate-500/60 hover:bg-slate-800/80'
            ]"
            @click="selectOrigin(option.value)"
          >
            <div class="flex items-start gap-3 relative z-10">
              <div
                :class="[
                  'flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold transition-colors',
                  selectedOrigin === option.value
                    ? 'bg-cyan-500 text-slate-900'
                    : 'bg-slate-700/80 text-slate-300'
                ]"
              >
                {{ option.number }}
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-white text-[15px] mb-1">{{ option.title }}</h3>
                <p class="text-[13px] text-gray-400 leading-relaxed">{{ option.description }}</p>
                <p class="text-[11px] text-gray-500 mt-1.5 italic">{{ option.tag }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-4 mb-6">
        <div>
          <label class="block text-xs text-gray-400 mb-1.5 font-medium">你的名字 / 代号</label>
          <input
            v-model="codename"
            type="text"
            :placeholder="selectedOrigin === 'six' ? '六号' : '输入你的名字或代号…'"
            class="w-full px-4 py-2.5 bg-slate-800/80 border text-sm rounded-lg transition-colors outline-none"
            :class="codename.trim() ? 'border-cyan-400/40 text-white' : 'border-slate-600/50 text-gray-300 placeholder-gray-500'"
            maxlength="30"
            @keyup.enter="confirm"
          />
        </div>
        <div v-if="selectedOrigin !== 'six'" class="animate-fadein">
          <label class="block text-xs text-gray-400 mb-1.5 font-medium">角色设定（可选）</label>
          <textarea
            v-model="characterDesc"
            rows="3"
            placeholder="简要描述你的角色背景、性格、外貌…"
            class="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-600/50 rounded-lg text-sm text-white placeholder-gray-500 outline-none focus:border-cyan-400/40 transition-colors resize-none"
            maxlength="500"
          ></textarea>
        </div>
      </div>

      <button
        :disabled="!codename.trim() || submitting"
        :class="[
          'w-full py-3 rounded-lg font-semibold text-sm tracking-wide transition-all duration-200',
          codename.trim() && !submitting
            ? 'bg-cyan-600 text-white hover:bg-cyan-500 hover:shadow-lg hover:shadow-cyan-500/15 active:scale-[0.98] cursor-pointer'
            : 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
        ]"
        @click="confirm"
      >
        <span v-if="submitting" class="flex items-center justify-center gap-2">
          <span class="inline-block w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
          正在传送…
        </span>
        <span v-else>确认选择 · 开始任务</span>
      </button>
    </template>

    <template v-else>
      <div class="text-center py-6">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/15 flex items-center justify-center">
          <svg class="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <h2 class="text-lg font-bold text-white mb-2">身份确认完成</h2>
        <p class="text-sm text-gray-400 mb-1">
          任务档案：<span class="text-cyan-300">{{ identityLabel }}</span>
        </p>
        <p class="text-sm text-gray-400 mb-5">
          代号：<span class="text-cyan-300">{{ codename }}</span>
        </p>
        <p class="text-xs text-gray-500">通讯频道已接通，你可以发送任意消息开始冒险。</p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useDataStore } from './store';

const store = useDataStore();
const { data } = store;

type Origin = 'six' | 'partner' | 'local';

const identityOptions = [
  {
    value: 'six' as Origin,
    number: 1,
    title: '战斗员六号',
    description: '你就是如月的精英战斗员。与高性能战斗机器人爱丽丝搭档，被传送到异世界执行侵略先遣任务。',
    tag: '原作主角视角 · 晓夏目式轻小说文风',
  },
  {
    value: 'partner' as Origin,
    number: 2,
    title: '如月第三搭档',
    description: '你是如月追加派遣的第三名成员，与六号和爱丽丝一同被传送到异世界。组织觉得两人不够用，把你也塞进了传送阵。',
    tag: '原创角色 · 六号作为独立NPC存在',
  },
  {
    value: 'local' as Origin,
    number: 3,
    title: '异世界本地人',
    description: '你是葛瑞丝王国的居民。某天，两个自称来自「如月」的怪人突然出现在边境荒野。',
    tag: '本地视角 · 六号和爱丽丝作为NPC登场',
  },
] as const;

const identityLabelMap: Record<Origin, string> = {
  six: '战斗员六号',
  partner: '如月第三搭档',
  local: '异世界本地人',
};

const selectedOrigin = ref<Origin>((data.user_origin as Origin) || 'six');
const codename = ref(data.user_codename || '');
const characterDesc = ref('');
const confirmed = ref(false);
const submitting = ref(false);

const identityLabel = computed(() => identityLabelMap[selectedOrigin.value]);

watch(selectedOrigin, (val) => {
  if (val === 'six' && !codename.value.trim()) {
    codename.value = '六号';
  }
});

function selectOrigin(value: Origin) {
  selectedOrigin.value = value;
}

async function confirm() {
  if (!codename.value.trim() || submitting.value) return;
  submitting.value = true;
  try {
    data.user_origin = selectedOrigin.value;
    data.user_codename = codename.value.trim();
    confirmed.value = true;
  } catch (e: any) {
    console.error('更新变量失败:', e);
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped>
.animate-fadein {
  animation: fadeIn 0.3s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
