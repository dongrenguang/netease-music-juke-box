export default class TimeUtil
{
    static formatPlayTime(ms)
    {
        const s = Math.round(ms / 1000);
        const second = digt2(s % 60);
        const minute = digt2((s - second) / 60);
        return `${minute}:${second}`;
    }
}

function digt2(num)
{
    if (num > 9)
    {
        return `${num}`;
    }
    else
    {
        return `0${num}`;
    }
}
