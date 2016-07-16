const NM_API_URL = "/api";

export default class ServiceClient
{
    static _instance = null;

    static getInstance()
    {
        if (ServiceClient._instance === null)
        {
            ServiceClient._instance = new ServiceClient();
        }
        return ServiceClient._instance;
    }

    constructor()
    {
        this._userId = null;
    }

    get userId()
    {
        return this._userId;
    }

    async login()
    {
        try
        {
            await this.__pseudoLogin();
        }
        catch (error)
        {
            console.error(error);
        }
    }

    async __pseudoLogin()
    {
        try
        {
            this._userId = "83224766";
        }
        catch (error)
        {
            console.error(error);
        }
    }

    async getUserPlayLists(uid = this.userId)
    {
        try
        {
            const res = await $.ajax({
                url: `${NM_API_URL}/user/playlist/`,
                data: {
                    uid,
                    limit: 1000,
                    offset: 0
                }
            });

            if (res.code === 200)
            {
                return res.playlist;
            }
            else
            {
                throw new Error(`Response with error code: ${res.code}`);
            }
        }
        catch (error)
        {
            console.error(error);
        }
    }

    async getPlayListDetail(id)
    {
        try
        {
            const res = await $.ajax({
                url: `${NM_API_URL}/playlist/detail`,
                data: {
                    id
                }
            });

            if (res.code === 200)
            {
                return res.result;
            }
            else
            {
                throw new Error(`Response with error code: ${res.code}`);
            }
        }
        catch (error)
        {
            console.error(error);
        }
    }

    async search(keyword, suggest = false)
    {
        try
        {
            let res = await $.ajax({
                url: suggest ? `${NM_API_URL}/search/suggest/web` : `${NM_API_URL}/search/get/`,
                method: "post",
                data: {
                    s: keyword,
                    type: 1,
                    offset: 0,
                    limit: 100,
                    sub: false
                }
            });

            if (res)
            {
                res = JSON.parse(res);
            }

            if (res.code === 200)
            {
                return res.result.songs;
            }
            else
            {
                throw new Error(`Response with error code: ${res.code}`);
            }
        }
        catch (error)
        {
            console.error(error);
        }
    }
}
