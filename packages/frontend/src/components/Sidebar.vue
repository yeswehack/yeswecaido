<template>
  <div class="backdrop" :class="{ show }" @click="emit('close')" />
  <Transition name="slideIn">
    <div
      class="absolute top-[50px] shadow-lg shadow-black/20 border-surface-500 border-l right-0 w-[60%] bottom-0 bg-surface-800 "
      :class="show ? `block` : 'hidden'"
      position="right"
      v-if="show"
    >
      <div
        class="absolute top-0 left-0 -translate-x-full border-l-surface-500 border-b-surface-500 border-t-0 p-2 px-3 border-r-surface-800 border bg-surface-800 text-xl aspect-square rounded-bl cursor-pointer"
        @click="emit('close')"
      >
        <i class="fas fa-close" />
      </div>
      <div class="overflow-y-auto h-full p-4">
        <slot />
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
const show = defineModel<boolean>();
const emit = defineEmits<{
  close: [];
}>();
</script>

<style scoped>
.slideIn-enter-active,
.slideIn-leave-active {
  transition: transform 0.3s;
}

.slideIn-enter-from,
.slideIn-leave-to {
  transform: translateX(100%);
}

.backdrop.show {
  @apply fixed inset-0 bg-black/50 backdrop-blur-sm;
}
</style>
