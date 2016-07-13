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
        catch (e)
        {
            console.error(e);
        }
    }

    async __pseudoLogin()
    {
        try
        {
            this._userId = "83224766";
        }
        catch (e)
        {
            console.error(e);
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
        catch (e)
        {
            console.error(e);
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
        catch (e)
        {
            console.error(e);
        }
    }
}
