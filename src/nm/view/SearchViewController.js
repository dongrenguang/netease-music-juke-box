import ViewController from "../../nju/view/ViewController";

import SearchView from "./SearchView";

export default class SearchViewController extends ViewController
{
    createView(options)
    {
        if (options && options.id)
        {
            return new SearchView(options.id);
        }
        else
        {
            return new SearchView();
        }
    }
}
