export function fetching(url: string, options?: any) {
    const baseUrl = 'http://localhost:3011'
    if (url.startsWith('/'))
        url = url.slice(1)
    return fetch(baseUrl + url, options)
}

export class bring {
    private static baseURL: any;

    static create({baseURL}: any) {
        if (!baseURL.endsWith('/')) baseURL += '/'
        this.baseURL = baseURL
    }

    static async request({url, method = 'get', body = {}, headers = {}}: any) {
        if (url.startsWith('/')) url = url.slice(1)
        return await fetch(this.baseURL + url, {
            body, headers, method
        }).then((res) => res.json())
    }
    static async get({url,params={}, headers = {}}: any){
        if (url.startsWith('/')) url = url.slice(1)
        {
        //     未完待续。。。。。。
        }
    }
}