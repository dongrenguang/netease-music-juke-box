import NJUApplicationController from "../../nju/app/ApplicationController";

import Application from "./Application";
import ServiceClient from "../service/ServiceClient";

export default class ApplicationController extends NJUApplicationController
{
    init()
    {
        super.init();
        this._playLists = [];
        this._selectedPlayList = null;
    }

    get playLists()
    {
        return this._playLists;
    }

    set playLists(value)
    {
        this._playLists = value;
        this._onPlayListsChanged();
    }

    get selectedPlayList()
    {
        return this._selectedPlayList;
    }

    set selectedPlayList(value)
    {
        if (this.selectedPlayList !== value)
        {
            this._selectedPlayList = value;
            this._onSelectedPlayListChanged();
        }
    }

    createApplication(options)
    {
        const application = new Application();
        application.playListView.on("selectionchanged", this._playListView_selectionchanged.bind(this));
        return application;
    }

    async run()
    {
        console.log("Netease Music WebApp is now running...");

        try
        {
            await ServiceClient.getInstance().login();
            await this._loadUserPlayLists();
        }
        catch (e)
        {
            console.error(e);
        }
    }




    async _loadUserPlayLists()
    {
        try
        {
            this.playLists = await ServiceClient.getInstance().getUserPlayLists();
            if (this.playLists && this.playLists.length > 0)
            {
                this.application.playListView.selection = this.playLists[0];
            }
        }
        catch (e)
        {
            console.error(e);
        }
    }

    _onPlayListsChanged()
    {
        this.application.playListView.items = this.playLists;
    }

    _onSelectedPlayListChanged()
    {
        if (this.selectedPlayList)
        {
            this.application.trackTableView.items = this.selectedPlayList.tracks;
        }
        else
        {
            this.application.trackTableView.items = [];
        }
    }

    async _playListView_selectionchanged(e)
    {
        try
        {
            const playList = await ServiceClient.getInstance().getPlayListDetail(this.application.playListView.selectedId);
            this.selectedPlayList = playList;
        }
        catch (e)
        {
            console.error(e);
        }
    }
}
