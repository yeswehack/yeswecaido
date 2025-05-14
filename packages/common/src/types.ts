import _default from "postcss-prefixwrap";
import type { DefineAPI, DefineEvents, SDK } from "caido:plugin";
import type { Caido } from "@caido/sdk-frontend";
import { z } from "zod";

type API = DefineAPI<{
  loadPrograms: (sdk: YWH.BackendSDK, jwt?: string) => Promise<void>;
  loadFullProgram: (sdk: YWH.BackendSDK, slug: string, jwt?: string) => Promise<void>;
}>;

type BackendEvents = DefineEvents<{
  shortProgram: (data: YWH.ShortProgram) => void;
  fullProgram: (data: YWH.Program) => void;
  invalidJWT: () => void;
  stateChanged: (state: "loading" | "loaded") => void;
}>;

export const businessUnitParser = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  currency: z.enum(["EUR", "USD"]),
});

export const statsParser = z.object({
  max_reward: z.number().catch(0),
  average_reward: z.number().catch(0),
  average_first_time_response: z.number().catch(0),
  total_reports: z.number().catch(0),
  total_reports_last24_hours: z.number().catch(0),
  total_reports_last7_days: z.number().catch(0),
  total_reports_current_month: z.number().catch(0),
});

export const assetParser = z.object({
  url: z.string().nullable(),
});

export const rewardGridParser = z
  .object({
    bounty_low: z.number().catch(0),
    bounty_medium: z.number().catch(0),
    bounty_high: z.number().catch(0),
    bounty_critical: z.number().catch(0),
  })
  .catch(() => ({
    bounty_low: 0,
    bounty_medium: 0,
    bounty_high: 0,
    bounty_critical: 0,
  }));

export const shortProgramParser = z.object({
  _isFull: z.literal(false).catch(false),
  title: z.string(),
  slug: z.string(),
  type: z.enum(["bug-bounty", "vdp-in-app"]),
  bounty: z.boolean().catch(false),
  bounty_reward_min: z.number().catch(0),
  bounty_reward_max: z.number().catch(0),
  public: z.boolean().catch(true),
  business_unit: businessUnitParser,
  thumbnail: assetParser,
  scopes_count: z.number(),
});

export const scopeParser = z.object({
  scope: z.string(),
  scope_type: z.string(),
  asset_value: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
});

export const programParser = shortProgramParser.extend({
  _isFull: z.literal(true).catch(true),
  rules: z.string(),
  rules_html: z.string(),
  user_agent: z.string().catch(""),
  account_access: z.string().catch(""),
  account_access_html: z.string().catch(""),
  qualifying_vulnerability: z.array(z.string()).catch(() => []),
  non_qualifying_vulnerability: z.array(z.string()).catch(() => []),
  out_of_scope: z.array(z.string()).catch(() => []),
  scopes: z.array(scopeParser),
  reward_grid_default: rewardGridParser,
  reward_grid_very_low: rewardGridParser,
  reward_grid_low: rewardGridParser,
  reward_grid_medium: rewardGridParser,
  reward_grid_high: rewardGridParser,
  reward_grid_critical: rewardGridParser,
  stats: statsParser,
  banner: assetParser.optional(),
});

export const paginationParser = z.object({
  page: z.number(),
  nb_pages: z.number(),
  results_per_page: z.number(),
  nb_results: z.number(),
});

export function pageParser<T extends z.ZodTypeAny>(itemParser: T) {
  return z.object({
    items: z.array(itemParser),
    pagination: paginationParser,
  });
}

export declare namespace YWH {
  export type ShortProgram = z.infer<typeof shortProgramParser>;
  export type Program = z.infer<typeof programParser>;
  export type AnyProgram = ShortProgram | Program;
  export type RewardGrid = z.infer<typeof rewardGridParser>;

  export type BackendSDK = SDK<API, BackendEvents>;
  export type FrontendSDK = Caido<API, BackendEvents>;
}
