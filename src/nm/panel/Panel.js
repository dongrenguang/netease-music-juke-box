import View from "../../nju/view/View";

export default class Panel extends View
{
    constructor(...args)
    {
        super(...args);
        this._title = null;
        this.addStyleClass("nm-panel");
        this._initLayout();
    }

    _initLayout()
    {
        this.$header = $(`
            <header>
                <h2></h2>
            </header>
        `);
        this.$container = $(`<main/>`);
        this.$element.append(this.$header);
        this.$element.append(this.$container);
    }

    get title()
    {
        return this._title;
    }

    set title(title)
    {
        this._title = title;
        if (this.$header)
        {
            this.$header.children("h2").text(title);
        }
    }
}
