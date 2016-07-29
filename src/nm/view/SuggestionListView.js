import ListView from "nju/view/ListView";

export default class SuggestionListView extends ListView
{
    init()
    {
        super.init();
        this.addStyleClass("nm-suggestion-list-view");
    }


    renderItem(item, $li)
    {
        super.renderItem(item, $li);
        $li.text(item.name);
    }
}
