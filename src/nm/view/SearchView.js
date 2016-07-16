import View from "../../nju/view/View";

import SuggestionListView from "./SuggestionListView";

export default class SearchView extends View
{
    init()
    {
        super.init();
        this.addStyleClass("nm-search-view");
        this._initLayout();

        this.$element.on("keydown", this._onkeydown.bind(this));
        this.$element.on("click", "span.icon", this._icon_onclick.bind(this));
    }

    _initLayout()
    {
        this.$element.append(`<span class="icon iconfont icon-search" />`);
        this.$input = $(`<input type="search" placeholder="搜索音乐" />`);
        this.$element.append(this.$input);
        this._initSuggestionListView();

        this.$input.on("focus", () => this.trigger("focus"));
        this.$input.on("blur", () => this.trigger("blur"));
        this.$input.on("click", () => this.trigger("clicked"));
        let timeout = null;
        this.$input.on("input", () => {
            if (timeout)
            {
                window.clearTimeout(timeout);
                timeout = null;
            }
            timeout = window.setTimeout(() => {
                this.trigger("input");
            }, 300);
        });
    }

    _initSuggestionListView()
    {
        this.suggestionListView = new SuggestionListView("suggestion-list-view");
    }

    get text()
    {
        return this.$input.val();
    }

    set text(value)
    {
        this.$input.val(typeof(value) === "string" ? value.trim() : "");
    }

    search(text = this.text)
    {
        this.text = text;
        if (this.text !== "")
        {
            this.trigger("search");
        }
    }




    _onkeydown(e)
    {
        if (e.keyCode === 13)
        {
            this.search();
        }
    }

    _icon_onclick(e)
    {
        this.search();
    }
}
