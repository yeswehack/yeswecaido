import { pageParser, programParser, shortProgramParser } from "packages/common/src";
import type { YWH } from "@yeswecaido/common";
import { fetchTyped, JWTError } from "./utils";

const API = "https://api.yeswehack.com";

export const loadPrograms = async (sdk: YWH.BackendSDK, jwt = "") => {
  sdk.api.send("stateChanged", "loading");
  try {
    let pageId = 1;
    while (true) {
      const page = await fetchTyped(
        `${API}/programs?page=${pageId}`,
        pageParser(shortProgramParser),
        jwt ? { Authorization: `Bearer ${jwt}` } : {}
      );

      const shortPrograms = page.items;

      for (const short of shortPrograms) {
        sdk.api.send("shortProgram", short);
      }

      if (page.pagination.nb_pages === pageId) {
        break;
      }
      pageId++;
    }
  } catch (error) {
    if (error instanceof JWTError) {
      sdk.api.send("invalidJWT");
    }
    throw error;
  } finally {
    sdk.api.send("stateChanged", "loaded");
  }
};

export const loadFullProgram = async (sdk: YWH.BackendSDK, slug: string, jwt = "") => {
  try {
    const fullProgram = await fetchTyped(
      `${API}/programs/${slug}`,
      programParser,
      jwt ? { Authorization: `Bearer ${jwt}` } : {}
    );
    sdk.api.send("fullProgram", fullProgram);
  } catch (error) {
    if (error instanceof JWTError) {
      sdk.api.send("invalidJWT");
    }
    throw error;
  }
};
