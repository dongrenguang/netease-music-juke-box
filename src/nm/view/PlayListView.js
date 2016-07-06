import View from "../../nju/view/View.js";

export default class PlayListView extends View
{
    init()
    {
        super.init();
        this.addStyleClass("nm-play-list-view");
    }

    getElementTag()
    {
        return ("ul");
    }
}
