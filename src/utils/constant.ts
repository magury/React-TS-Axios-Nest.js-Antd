export const METHOD_POST = "post";
export function isChinese(value: string) {
    const re = /[^\u4E00-\u9FA5]/;
    return !re.test(value);

}