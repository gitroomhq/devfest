export const timer = async (time: number) => {
    return new Promise((res) => {
        setTimeout(res, time);
    })
}