import View from "../view/View";

window.$app = null;

export default class Application extends View
{
    constructor(...args)
    {
        super(...args);
        if (window.$app === null)
        {
            window.$app = this;
        }
        else
        {
            throw new Error("Application is a singleton object.")
        }
    }

    init()
    {
        super.init();
        this.addStyleClass("nju-application");
    }

    run()
    {

    }
}
