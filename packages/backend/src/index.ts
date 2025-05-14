import { loadFullProgram, loadPrograms } from "./api";
import { YWH } from "@yeswecaido/common";

export function init(sdk: YWH.BackendSDK) {
  // Register an API endpoint that frontend can call.
  sdk.api.register("loadPrograms", loadPrograms);
  sdk.api.register("loadFullProgram", loadFullProgram);
}
