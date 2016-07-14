import NJUApplicationController from "../../nju/app/ApplicationController";

import Application from "./Application";
import ServiceClient from "../service/ServiceClient";

export default class ApplicationController extends NJUApplicationController
{
    init()
    {
        super.init();
        this._playLists = [];
        this._activePlayList = null;
        this._activeTrack = null;
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

    get activePlayList()
    {
        return this._activePlayList;
    }

    set activePlayList(value)
    {
        if (this.activePlayList !== value)
        {
            this._activePlayList = value;
            this._onActivePlayListChanged();
        }
    }

    get activeTrack()
    {
        return this._activeTrack;
    }

    set activeTrack(value)
    {
        if (this.activeTrack !== value)
        {
            this._activeTrack = value;
            this._onActiveTrackChanged();
        }
    }

    createApplication(options)
    {
        const application = new Application();
        application.playListView.on("selectionchanged", this._playListView_selectionchanged.bind(this));
        application.trackTableView.on("selectionchanged", this._playerView_selectionchanged.bind(this));
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

    _onActivePlayListChanged()
    {
        if (this.activePlayList)
        {
            const tracks = this.activePlayList.tracks;
            this.application.trackTableView.items = tracks;

            console.log(this.activeTrack);
            // if (!this.activeTrack && tracks && tracks.length > 0)
            // {
            //     this.application.trackTableView.selection = tracks[0];
            // }
        }
        else
        {
            this.application.trackTableView.items = [];
        }
    }

    _onActiveTrackChanged()
    {
        if (this.activeTrack)
        {
            this.application.playerView.track = this.activeTrack;
        }
    }

    async _playListView_selectionchanged(e)
    {
        try
        {
            const playList = await ServiceClient.getInstance().getPlayListDetail(this.application.playListView.selectedId);
            this.activePlayList = playList;
        }
        catch (e)
        {
            console.error(e);
        }
    }

    _playerView_selectionchanged()
    {
        this.activeTrack = this.application.trackTableView.selection;
        console.log("_playerView_selectionchanged", this.activeTrack);
    }
}
