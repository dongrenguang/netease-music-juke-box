import TableView from "nju/view/TableView";
import TimeUnit from "../util/TimeUtil";

export default class TrackTableView extends TableView
{
    init()
    {
        super.init();
        this.addStyleClass("nm-track-table-view striped");
        this.$container.on("dblclick", this.getItemElementTag(), () => {
            this.trigger("activetrackchanged");
        });
    }

    $createNewItem(itemType = 0)
    {
        return $(`
            <tr>
                <td class="name" />
                <td class="artists" />
                <td class="album" />
                <td class="play-time" />
            </tr>
        `);
    }

    renderItem(item, $item)
    {
        super.renderItem(item, $item);
        $item.children(".name").text(item.name);
        $item.children(".artists").text(item.artists.map(artist => artist.name).join(", "));
        $item.children(".album").text(item.album.name);
        let duration = 0;
        if (item.lMusic)
        {
            duration = item.lMusic.playTime;
        }
        else
        {
            duration = item.duration;
        }
        $item.children(".play-time").text(TimeUnit.formatPlayTime(duration));
    }

    renderHeadItem($headItem)
    {
        super.renderHeadItem($headItem);
        $headItem.children(".name").text("音乐标题");
        $headItem.children(".artists").text("歌手");
        $headItem.children(".album").text("专辑");
        $headItem.children(".play-time").text("时长");
    }
}
