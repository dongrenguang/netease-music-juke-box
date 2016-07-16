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

    createApplication(options)
    {
        const application = new Application();
        return application;
    }

    initApplication()
    {
        super.initApplication();

        this.playerView = this.application.playerView;

        this.playListView = this.application.playListView;
        this.playListView.on("selectionchanged", this._playListView_selectionchanged.bind(this));

        this.searchView = this.application.searchView;
        this.searchView.on("search", this._searchView_search.bind(this));

        this.trackTableView = this.application.trackTableView;
        this.trackTableView.on("activetrackchanged", this._playerView_selectionchanged.bind(this));
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

    async run()
    {
        console.log("Netease Music WebApp is now running...");

        try
        {
            await ServiceClient.getInstance().login();
            await this._loadUserPlayLists();
        }
        catch (error)
        {
            console.error(error);
        }
    }




    async _loadUserPlayLists()
    {
        try
        {
            this.playLists = await ServiceClient.getInstance().getUserPlayLists();
            if (this.playLists && this.playLists.length > 0)
            {
                this.playListView.selection = this.playLists[0];
            }
        }
        catch (error)
        {
            console.error(error);
        }
    }

    _onPlayListsChanged()
    {
        this.playListView.items = this.playLists;
    }

    _onActivePlayListChanged()
    {
        if (this.activePlayList)
        {
            this.trackTableView.items = this.activePlayList.tracks;
        }
        else
        {
            this.trackTableView.items = [];
        }
    }

    _onActiveTrackChanged()
    {
        if (this.activeTrack)
        {
            this.playerView.track = this.activeTrack;
        }
    }

    async _playListView_selectionchanged(e)
    {
        try
        {
            if (this.playListView.selectedId)
            {
                const playList = await ServiceClient.getInstance().getPlayListDetail(this.playListView.selectedId);
                this.activePlayList = playList;
            }
        }
        catch (error)
        {
            console.error(error);
        }
    }

    _playerView_selectionchanged()
    {
        this.activeTrack = this.trackTableView.selection;
    }

    async _searchView_search(e)
    {
        try
        {
            this.playListView.selectItem(null);
            this.activePlayList = {
                tracks: await ServiceClient.getInstance().search(this.searchView.text)
            };
        }
        catch (error)
        {
            console.error(error);
        }
    }
}
