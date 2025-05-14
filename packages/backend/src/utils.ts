import type { z } from "zod";
import { fetch } from "caido:http";

export class FetchError extends Error {}

export class JWTError extends FetchError {}
export class NotFound extends FetchError {}

// Fetch a URL and return the JSON response data if it matches the given schema
export async function fetchTyped<T extends z.ZodTypeAny>(
  url: string,
  schema: T,
  headers: Record<string, string> = {}
): Promise<z.infer<T>> {
  try {
    const resp = await fetch(url, { headers: headers });
    if (resp.status === 401) {
      throw new JWTError("JWT token is invalid");
    }
    if (resp.status === 404) {
      throw new NotFound("URL not found");
    }
    if (!resp.ok) {
      throw new FetchError(`could not fetch the given URL: ${url}`);
    }
    return schema.parse(await resp.json());
  } catch (error) {
    console.error(error);
    throw new FetchError(`Could not get the programs please contact YesWeHack support if the problem persists`);
  }
}
