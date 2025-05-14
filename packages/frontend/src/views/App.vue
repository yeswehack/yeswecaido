<template>
  <div id="plugin--yeswecaido">
    <Toolbar class="!bg-surface-800 ml-4 relative border-none py-2 px-4">
      <template #start>
        <img src="@/assets/logo-white.svg" alt="yeswehack logo" class="w-32 h-auto" />
        <div class="p-4 cursor-pointer text-red-500 font-bold" @click="copyLink('https://yeswehack.com/programs/')">
          https://yeswehack.com/programs/
        </div>
      </template>
      <template #center>
        <IconField>
          <InputIcon>
            <i class="fas fa-search" />
          </InputIcon>
          <InputText
            type="text"
            v-model="searchKeyword"
            :placeholder="`Search... (${programs.length} programs)`"
            class="w-[400px]"
          />
        </IconField>
      </template>

      <template #end>
        <div class="flex items-center gap-2">
          <FloatLabel variant="on">
            <Password v-model="jwt" inputId="on_label" :feedback="false" />
            <label for="on_label">Set JWT</label>
          </FloatLabel>

          <Button
            @click="refresh"
            icon="fas fa-rotate-right"
            :loading="loading"
            v-tooltip.bottom="{
              value: 'Refresh Programs',
              pt: {
                text: '!max-w-[240px] !break-words !whitespace-normal p-4 rounded-xl bg-surface-700 bg-opacity-60 text-white shadow-lg',
              },
            }"
          />
        </div>
      </template>
    </Toolbar>

    <div
      class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 p-4 overflow-y-auto max-h-[calc(100%-54px)]"
      id="scroll-container"
    >
      <ProgramCard
        v-for="program in filteredPrograms"
        :key="program.slug"
        @click="viewProgramDetails(program)"
        :program="program"
      />
    </div>
    <Sidebar :model-value="!!selectedProgram" @close="selectedProgram = undefined">
      <ProgramDetails v-if="selectedProgram" :program="selectedProgram" />
    </Sidebar>
  </div>
</template>

<style scoped>
#plugin--yeswecaido {
  height: 100%;
  width: 100%;
}
</style>

<script lang="ts" setup>
import ProgramDetails from "@/components/ProgramDetails.vue";
import Sidebar from "@/components/Sidebar.vue";
import Button from "primevue/button";
import FloatLabel from "primevue/floatlabel";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Toolbar from "primevue/toolbar";
import ProgramCard from "@/components/ProgramCard.vue";
import { computed, ref } from "vue";
import { YWH } from "@yeswecaido/common";
import { useYwhPrograms } from "@/composables/useYwhPrograms";
import { useSDK } from "@/plugins/sdk";

const sdk = useSDK();

const { programs, jwt, loading, refresh } = useYwhPrograms();

const selectedProgram = ref<YWH.Program>();
const searchKeyword = ref("");

function viewProgramDetails(program: YWH.AnyProgram) {
  if (program._isFull) {
    selectedProgram.value = program;
  }
}

// Display the programs from a given keyword, and sort them by title
const filteredPrograms = computed(() => {
  const needle = searchKeyword.value.toLowerCase();
  return programs.value
    .filter((program) => {
      return program.slug.toLowerCase().includes(needle);
    })
    .toSorted((a, b) => {
      if (a.slug === "dojo") {
        return -1;
      }

      if (b.slug === "dojo") {
        return 1;
      }

      return a.title.localeCompare(b.title);
    });
});

function copyLink(link: string) {
  navigator.clipboard
    .writeText(link)
    .then(() => {
      sdk.window.showToast(`Link copied: ${link}`, {
        variant: "success",
        duration: 1000,
      });
    })
    .catch(() => {
      sdk.window.showToast(`Failed to copy link: ${link}`, {
        variant: "error",
        duration: 1000,
      });
    });
}
</script>
