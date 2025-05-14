import { useSDK } from "@/plugins/sdk";
import { getScope } from "../utils/scope";

export function useCaidoConfig() {
  const matchReplaceCollectionName = "yeswecaido-user_agent";
  const sdk = useSDK();

  function getScopeByName(name: string) {
    return sdk.scopes.getScopes().find((s) => s.name === name);
  }

  async function setUserAgent(programName: string, user_agent_part: string) {
    // Set User-Agent header and value
    if (user_agent_part.length == 0 || user_agent_part === undefined) {
      user_agent_part = "bugbounty-yeswehack";
    }

    // Create match & replace rule if it do not exists
    let collection = sdk.matchReplace.getCollections().find((c) => c.name === matchReplaceCollectionName);
    if (collection === undefined) {
      collection = await sdk.matchReplace.createCollection({ name: matchReplaceCollectionName });
    }

    // Check if the User-Agent is already set
    const issetRule = sdk.matchReplace.getRules().find((r) => r.collectionId == collection.id && r.name == programName);
    if (issetRule) {
      sdk.window.showToast(`User agent is already set in collection: ${collection.name}`, {
        variant: "error",
        duration: 5000,
      });
      return;
    }
    

    // Set the new rule within the specified collection
    try {
      await sdk.matchReplace.createRule({
        name: programName,
        collectionId: collection?.id, // 3
        isEnabled: true,
        
        section: {
         kind: "SectionRequestHeader",
         operation: {
            kind: "OperationHeaderRaw",
            matcher: {
              kind: "MatcherRawRegex",
              regex: "^User-Agent:(.*?)$"
            },
            replacer: {
              kind: "ReplacerTerm",
              term: `User-Agent: $1 ${user_agent_part}`
            }
        },
        query: "",
      }});
    }
    catch (error) {
      sdk.window.showToast(`Failed to add user-agent match & replace rule, error ${error}`, {
        variant: "error",
        duration: 5000,
      });
    }

    sdk.window.showToast("User agent added in match & replace", {
      variant: "success",
      duration: 1000,
    });
  }

  async function addScope(name: string, url: string) {
    try {
      const scope = getScopeByName(name);
      const domain = getScope(url);


      if (scope) {
        // Add the new domain to the current scope

        if (scope.allowlist.includes(domain)) {
          sdk.window.showToast(`Scope already exists: ${domain}`, {
            variant: "info",
            duration: 1000,
          });
          return;
        }

        scope.allowlist.push(domain);

        // Update an already existing scope with a new asset
        await sdk.scopes
          .updateScope(scope.id, {
            name: name,
            allowlist: scope.allowlist,
          })
          .then((msg) => {
            sdk.window.showToast(`Scope updated, added: ${msg?.name}`, {
              variant: "success",
              duration: 1000,
            });
          })
          .catch((error) => {
            sdk.window.showToast(`Failed to add scope:[${url}], Error : ${error}`, {
              variant: "error",
              duration: 5000,
            });
          });
      } else {
        // Create a new scope and add the new given scope
        await sdk.scopes
          .createScope({
            name: name,
            allowlist: [domain],
            denylist: [],
          })
          .then((msg) => {
            sdk.window.showToast(`New scope added: ${msg?.name}`, {
              variant: "success",
              duration: 1000,
            });
          })
          .catch((error) => {
            sdk.window.showToast(`Failed to add scope:[${url}], Error : ${error}`, {
              variant: "error",
              duration: 5000,
            });
          });
      }
    } catch {
      sdk.window.showToast(
        `Could add scope due to limited scope support in caido. Use copy-paste instead for:[${url}]`,
        {
          variant: "error",
          duration: 7000,
        }
      );
    }
  }

  async function deleteScope(name: string, url: string) {
    const scopes = getScopeByName(name);

    const domain = new URL(url).hostname;

    if (scopes) {
      sdk.scopes.updateScope(scopes.id, {
        allowlist: scopes.allowlist.filter((item) => item !== domain),
      });

      sdk.window.showToast("Program scope successfully deleted", {
        variant: "warning",
        duration: 1000,
      });
    } else {
      sdk.window.showToast("Program scope could not be deleted (may not exist)", {
        variant: "error",
        duration: 1000,
      });
    }
  }

  async function deleteProgramScope(name: string) {
    const scopeId = getScopeByName(name)?.id;

    if (!scopeId) return;

    await sdk.scopes
      .deleteScope(scopeId)
      .then((msg) => {
        sdk.window.showToast(`Deleted program scope: ${name}`, {
          variant: "warning",
          duration: 1000,
        });
      })
      .catch((error) => {
        sdk.window.showToast(`Failed to delete scope, Error : ${error}`, {
          variant: "error",
          duration: 5000,
        });
      });
  }

  return {
    setUserAgent,
    addScope,
    deleteScope,
    deleteProgramScope,
  };
}
