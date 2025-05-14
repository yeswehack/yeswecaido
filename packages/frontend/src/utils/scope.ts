// Get the supported scope format for Caido
// Caido version 0.47.1 do not yet support paths in the scope
export function getScope (url:string): string {
    // Wildcard placeholder must be lowercase to be supported in the URL parser
    const placeholder = "__wildcard_char__"
    url = !url.match(/^https?:\/\//) ? `http://${url}` : url
  
    // Replace wildcard char temporary to pass the URL parser
    url = url.replace("*", placeholder)
    let parsedUrl = new URL(url).hostname
    return parsedUrl.replace(placeholder, "*")
  }
  