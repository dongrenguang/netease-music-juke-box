import Panel from "./panel/Panel";
import PlayListView from "./view/PlayListView";

function main()
{
    const playListView = new PlayListView("play-list");

    const panel = new Panel("panel");

    panel.addSubview(playListView);
    panel.title = "Title";

    $(document.body).append(panel.$element);
}

$(main);
