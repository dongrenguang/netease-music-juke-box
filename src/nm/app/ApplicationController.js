import NJUApplicationController from "../../nju/app/ApplicationController";

import Application from "./Application";
import ServiceClient from "../service/ServiceClient";

export default class ApplicationController extends NJUApplicationController
{
    createApplication(options)
    {
        const application = new Application();
        return application;
    }

    async run()
    {
        console.log("Netease Music WebApp is now running...");

        try
        {
            await ServiceClient.getInstance().login();
            this.application.playListView.items = await ServiceClient.getInstance().getUserPlayLists();

            const playlist = await ServiceClient.getInstance().getPlayListDetail(this.application.playListView.items[0].id);
            this.application.playListView.selection = this.application.playListView.items[0];
            this.application.trackTableView.items = playlist.tracks;
            console.log(playlist.tracks[0]);
        }
        catch (e)
        {
            console.error(e);
        }
    }
}
