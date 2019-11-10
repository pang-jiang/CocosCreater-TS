import DataModel from "./model/DataModel";
import LoginModel from "./model/Login/LoginModel";
import SystemModel from "./model/System/SystemModel";
import { SingletonFactory } from "../core/utils/SingletonFactory";

class GameDataCenter {
    private _tModel: Array<DataModel> = [];

    account: LoginModel = null;
    system: SystemModel = null;

    newModel<T extends DataModel>(c: { new(): T }): T {
        let obj = SingletonFactory.getInstance(c);
        this._tModel.push(obj);
        return obj
    }

    clear() {
        this._tModel.forEach(m => {
            m.clear();
        });
    }

    initModule() {
        this.account = this.newModel(LoginModel);
    }
}

export default new GameDataCenter();