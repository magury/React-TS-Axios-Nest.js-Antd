export const METHOD_POST = "post";

export function isChinese(value: string) {
    const re = /[^\u4E00-\u9FA5]/;
    return !re.test(value);

}

export function isCount(value: string) {
    const re = /^[A-Za-z0-9]+$/
    return !re.test(value)
}
export const port=3011


