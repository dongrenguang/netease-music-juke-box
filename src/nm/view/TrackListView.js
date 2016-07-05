export default class TrackListView
{
    constructor()
    {
        this._tracks = [];
        this.$element = $(`<ul/>`);
        this.$element.addClass("nm-track-list-view");
    }

    get tracks()
    {
        return this._tracks;
    }

    set tracks(tracks)
    {
        this._tracks = tracks;
        this._removeAllTracks();
        this._addTracks(this._tracks);
    }

    _removeAllTracks()
    {
        this.$element.children("li").remove();
    }

    _addTracks(tracks)
    {
        tracks.forEach(track => {
            this._addTrack(track);
        });
    }

    _addTrack(track)
    {
        const $li = $(`
            <li class=track>
                <a href=${track.mp3Url}>
                    <span class=name>${track.name}</span>
                </a>
            </li>
        `);

        this.$element.append($li);
    }
}
