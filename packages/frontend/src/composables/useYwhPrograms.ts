import { useSDK } from "@/plugins/sdk";
import { YWH } from "@yeswecaido/common";
import { watchDebounced } from "@vueuse/core";
import { computed, reactive, readonly, ref } from "vue";

let _ywh: ReturnType<typeof createYwhPrograms> | null = null;

function createYwhPrograms() {
  const shortPrograms = reactive(new Map<string, YWH.ShortProgram>());
  const fullPrograms = reactive(new Map<string, YWH.Program>());
  const jwt = ref("");
  const state = ref<"loading" | "loaded">("loading");

  const sdk = useSDK();

  sdk.backend.onEvent("shortProgram", (short) => {
    shortPrograms.set(short.slug, short);
  });

  sdk.backend.onEvent("fullProgram", (full) => {
    fullPrograms.set(full.slug, full);
  });

  sdk.backend.onEvent("invalidJWT", () => {
    jwt.value = "";
    sdk.window.showToast(`Invalid JWT`, {
      variant: "error",
    });
  });

  sdk.backend.onEvent("stateChanged", (newState) => {
    state.value = newState;
  });

  const refresh = () => {
    sdk.backend.loadPrograms(jwt.value);
  };

  watchDebounced(jwt, refresh, {
    debounce: 500,
    immediate: true,
  });

  function loadFullProgram(slug: string) {
    sdk.backend.loadFullProgram(slug, jwt.value);
  }

  const programs = computed(() => {
    return Array.from(shortPrograms.values()).map((short) => {
      const full = fullPrograms.get(short.slug);
      if (full) {
        return {
          ...short,
          ...full,
        };
      }
      return short;
    });
  });

  return {
    loading: readonly(computed(() => state.value === "loading")),
    programs,
    jwt,
    refresh,
    loadFullProgram,
  };
}

export function useYwhPrograms() {
  if (!_ywh) {
    _ywh = createYwhPrograms();
  }
  return _ywh;
}
