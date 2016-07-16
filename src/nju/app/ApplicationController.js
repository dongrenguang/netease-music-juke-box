import Application from "./Application";
import ViewController from "../view/ViewController";

export default class ApplicationController extends ViewController
{
    static _instance = null;

    static getInstance()
    {
        if (ApplicationController._instance === null)
        {
            throw new Error("ApplicationController has not been instantiated yet.");
        }
        return ApplicationController._instance;
    }

    constructor(...args)
    {
        super(...args);
        if (ApplicationController._instance === null)
        {
            ApplicationController._instance = this;
        }
        else
        {
            throw new Error("ApplicationController is a singleton object. It can only be constructed once.");
        }
    }

    get application()
    {
        return this.view;
    }

    createView(options = {})
    {
        return this.createApplication(options);
    }

    createApplication(options = {})
    {
        return new Application();
    }

    initView()
    {
        super.initView();
        this.initApplication();
    }

    initApplication()
    {

    }

    run()
    {

    }
}
