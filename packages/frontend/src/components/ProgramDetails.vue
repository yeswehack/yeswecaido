<template>
  <div class="w-full select-text">
    <ProgramInfo :program="program">
      <h2 class="py-4 font-bold text-white uppercase">Description</h2>
      <div class="bg-black p-4 rounded-xl">
        {{ program.business_unit.description }}
      </div>
    </ProgramInfo>

    <ProgramRewardTable class="py-2" :program="program" />
    <ProgramScopeTable class="py-2" :program="program" />

    <div>
      <h2 class="py-4 font-bold text-white uppercase">out of scope</h2>
      <ul v-for="desc in program.out_of_scope" class="flex items-center gap-x-2 leading-6">
        <li>{{ desc }}</li>
      </ul>
    </div>

    <div v-if="program.non_qualifying_vulnerability">
      <h2 class="py-4 font-bold text-white uppercase">qualifying vulnerabilities</h2>
      <ul v-for="desc in program.qualifying_vulnerability" class="flex items-center gap-x-2 leading-6">
        <i class="fas fa-caret-right text-red-500" />
        <li>{{ desc }}</li>
      </ul>
    </div>

    <div v-if="program.non_qualifying_vulnerability">
      <h2 class="py-4 font-bold text-white uppercase">non-qualifying vulnerabilities</h2>
      <ul v-for="desc in program.non_qualifying_vulnerability" class="flex items-center gap-x-2 leading-6">
        <i class="fas fa-caret-right text-red-500" />
        <li>{{ desc }}</li>
      </ul>
    </div>

    <div>
      <h2 class="py-4 font-bold text-white uppercase">rules</h2>
      <div v-html="rules" class="prose prose-h1:text-lg prose-invert"></div>
    </div>

    <div v-if="program.account_access">
      <h2 class="py-4 font-bold text-white uppercase">account access</h2>
      <div v-html="accountAccess" class="prose prose-h1:text-lg prose-invert"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from "vue";
import ProgramInfo from "./ProgramInfo.vue";
import ProgramRewardTable from "./ProgramRewardTable.vue";
import ProgramScopeTable from "./ProgramScopeTable.vue";
import type { YWH } from "@yeswecaido/common";
import DomPurify from "dompurify";
const props = defineProps<{
  program: YWH.Program;
}>();

const rules = computed(() => {
  return DomPurify.sanitize(props.program.rules_html);
});

const accountAccess = computed(() => {
  return DomPurify.sanitize(props.program.account_access_html);
});
</script>
