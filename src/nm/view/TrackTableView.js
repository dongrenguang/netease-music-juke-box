import TableView from "../../nju/view/TableView";

export default class TrackTableView extends TableView
{
    init()
    {
        super.init();
        this.addStyleClass("nm-track-table-view");
    }

    $createNewItem(itemType = 0)
    {
        return $(`
            <tr>
                <td class="name" />
                <td class="artists" />
                <td class="album" />
            </tr>
        `);
    }

    renderItem(item, $item)
    {
        $item.children(".name").text(item.name);
        $item.children(".artists").text(item.artists.map(artist => artist.name).join(", "));
        $item.children(".album").text(item.album.name);
    }

    renderHeadItem($headItem)
    {
        this.renderItem({
            name: "音乐标题",
            artists: [ { name: "歌手" } ],
            album: { name: "专辑" }
        }, $headItem);
    }
}
