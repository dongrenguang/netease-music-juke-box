import NJUApplication from "../../nju/app/Application";

export default class Application extends NJUApplication
{
    init()
    {
        super.init();
        this.addStyleClass("nm-application");
    }

    run()
    {
        console.log("Application is now running.");
    }
}
