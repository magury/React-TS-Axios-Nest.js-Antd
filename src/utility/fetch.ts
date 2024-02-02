import * as path from "path";

export function fetching(url: string, options?: any) {
    const baseUrl = 'http://localhost:3011'
    return fetch(path.join(baseUrl, url), options)
}