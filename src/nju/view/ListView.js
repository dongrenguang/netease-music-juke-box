import View from "./View";

export default class ListView extends View
{
    init()
    {
        super.init();
        this._items = [];
        this._selection = null;
        this._$itemTemplates = [];
        this.addStyleClass("nju-list-view");
        this._initLayout();

        this.$container.on("mousedown", this.getItemElementTag(), this._onclick.bind(this));
    }

    _initLayout()
    {

    }

    getElementTag()
    {
        return "ul";
    }

    getItemElementTag()
    {
        return "li";
    }

    get items()
    {
        return this._items;
    }

    set items(value)
    {
        // TODO optimize
        this.clearItems();
        this.addItems(value);
    }

    get selection()
    {
        return this._selection;
    }

    set selection(value)
    {
        this.selectItem(value);
    }

    get selectedId()
    {
        return this.getIdOfItem(this.selection);
    }

    getTypeOfItem(item)
    {
        return 0;
    }

    getIdOfItem(item)
    {
        if (item && item.id)
        {
            return item.id;
        }
        else
        {
            return null;
        }
    }

    clearItems()
    {
        this.selection = null;
        if (this.items !== null)
        {
            if (this.items.length > 0)
            {
                this._items.splice(0);
                this.$container.children(this.getItemElementTag()).remove();
            }
        }
    }

    addItems(items)
    {
        if (items && items.length)
        {
            items.forEach(item => {
                this.addItem(item);
            });
        }
    }

    addItem(item)
    {
        this._items.push(item);
        const itemType = this.getTypeOfItem(item);
        const $item = this.$createItem(itemType);
        this.renderItem(item, $item);
        this.$container.append($item);
    }




    selectItem(item = null)
    {
        if (this.selection === item)
        {
            return;
        }

        if (this.selection !== null)
        {
            this.$getItem(this.selection).removeClass("selected");
            this._selection = null;
        }

        this._selection = item;

        if (item)
        {
            const $item = this.$getItem(item);
            $item.addClass("selected");
        }

        this.trigger("selectionchanged");
    }

    showSelection()
    {
        this.removeStyleClass("hide-selection");
    }

    hideSelection()
    {
        this.addStyleClass("hide-selection");
    }




    renderItem(item, $item)
    {
        $item.data("item", item);
        $item.attr("id", `i-${this.getIdOfItem(item)}`);
    }

    $createItem(itemType = 0)
    {
        if (!this._$itemTemplates[itemType])
        {
            this._$itemTemplates[itemType] = this.$createNewItem(itemType);
        }

        return this._$itemTemplates[itemType].clone();
    }

    $createNewItem(itemType = 0)
    {
        return $(`<${this.getItemElementTag()} />`);
    }

    $getItem(item)
    {
        const id = this.getIdOfItem(item);
        return this.$container.children(`#i-${id}`);
    }




    _onclick(e)
    {
        const $item = $(e.currentTarget);
        const item = $item.data("item");
        this.selectItem(item);
        this.trigger("itemclicked");
    }
}
