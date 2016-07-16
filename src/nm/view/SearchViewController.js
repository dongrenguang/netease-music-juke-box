import ViewController from "../../nju/view/ViewController";

import SearchView from "./SearchView";
import ServiceClient from "../service/ServiceClient";

export default class SearchViewController extends ViewController
{
    createView(options)
    {
        return new SearchView("search-view");
    }

    initView()
    {
        this.view.on("focus", this._onfocus.bind(this));
        this.view.on("blur", this._onblur.bind(this));
        this.view.on("input", this._onChange.bind(this));

        this.suggestionListView = this.view.suggestionListView;
        this.suggestionListView.on("itemclicked", this._suggestionListView_itemclicked.bind(this));
    }

    showSuggestionListView()
    {
        this.view.addSubview(this.suggestionListView);
    }

    hideSuggestionListView()
    {
        this.view.removeSubview(this.suggestionListView);
    }

    toggleSuggestionListView(show)
    {
        if (show)
        {
            this.showSuggestionListView();
        }
        else
        {
            this.hideSuggestionListView();
        }
    }




    _onfocus(e)
    {
        this.showSuggestionListView();
    }

    _onblur(e)
    {
        this.hideSuggestionListView();
    }

    async _onChange(e)
    {
        try
        {
            const searchText = this.view.text;
            if (searchText)
            {
                const suggestionResult = await ServiceClient.getInstance().search(searchText, true);
                this.suggestionListView.items = suggestionResult;
                this.toggleSuggestionListView(suggestionResult && suggestionResult.length);
            }
            else
            {
                this.hideSuggestionListView();
            }
        }
        catch (e)
        {
            console.error(e);
        }
    }

    _suggestionListView_itemclicked()
    {
        this.view.search(this.suggestionListView.selection.name);
        this.hideSuggestionListView();
    }
}
