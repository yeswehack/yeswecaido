<template>
  <div>
    <h2 class="py-4 text-white font-bold uppercase">{{ program.title }}</h2>
    <div class="relative flex gap-x-4">
      <Button
        class="py-4 h-8 w-auto"
        icon="fas fa-trash-can"
        label="Remove program scopes"
        @click="caido.deleteProgramScope(program.slug)"
      />
      <Button
        v-if="program.user_agent.length > 0"
        class="py-4 h-8 w-auto"
        icon="fas fa-user-secret"
        label="Add user-agent"
        severity="info"
        @click="caido.setUserAgent(program.slug, program.user_agent)"
      />
    </div>
    <DataTable class="py-4" stripedRows :value="program.scopes" tableStyle="min-width: 50rem">
      <Column field="scope" header="Scope" sortable style="width: 50%">
        <template #body="{ data }">
          <div class="flex relative items-center w-full">
            <div class="flex gap-2">
              <Button
                class="w-8 h-8"
                text=""
                severity="info"
                icon="fas fa-copy"
                :value="data.scope"
                @click="copyLink(data.scope)"
              />
              <Button
                class="w-8 h-8"
                outlined=""
                severity="success"
                icon="fas fa-circle-plus"
                @click="caido.addScope(program.slug, data?.scope)"
              />
              <Button
                class="w-8 h-8"
                outlined=""
                icon="fas fa-trash-can"
                @click="caido.deleteScope(program.slug, data?.scope)"
              />
            </div>
            <span class="pl-4">{{ data?.scope }}</span>
          </div>
        </template>
      </Column>
      <Column field="scope_type" header="Type" sortable style="width: 20%" />
      <Column field="asset_value" header="Asset value" sortable style="width: 15%">
        <template #body="{ data }">
          <TagAssetValue :severity="data.asset_value" />
        </template>
        ></Column
      >
    </DataTable>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import TagAssetValue from "./TagAssetValue.vue";
import Button from "primevue/button";
import { YWH } from "@yeswecaido/common";
import { useSDK } from "@/plugins/sdk";
import { useCaidoConfig } from "@/composables/useCaidoConfig";

const caido = useCaidoConfig();

defineProps<{
  program: YWH.Program;
}>();

const sdk = useSDK();

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
