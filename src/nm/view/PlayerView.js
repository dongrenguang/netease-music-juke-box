import View from "../../nju/view/View";

export default class PlayerView extends View
{
    init()
    {
        super.init();
        this.addStyleClass("nm-player-view");
        this._track = null;
        this._initLayout();
    }

    _initLayout()
    {
        this.$track = $(`
            <span class="track-name"></span>
        `);
        this.$element.append(this.$track);
    }

    get track()
    {
        return this._track;
    }

    set track(value)
    {
        if (this._track !== value)
        {
            this._track = value;
            this.$track.text(this.track.name);
        }
    }
}
