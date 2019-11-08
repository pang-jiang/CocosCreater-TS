import { G2C_Login, C2G_Login } from "../../ProtoMessage";
import DataModel from "../DataModel";
import UIHelp from "../../uiManager/UIHelp";
import EventManager from "../../eventManager/EventManager";
import { GameEvent } from "../../const/EventConst";

const KEY_ACCOUNT = 'account';

export default class LoginModel extends DataModel {
    constructor() {
        super('account');
    }

    /**缓存账号到本地 */
    saveAccount(account: string) {
        this.Set(KEY_ACCOUNT, account);
        this.Save();
    }

    /**从本地读取缓存账号 */
    getAccount() {
        return this.Query(KEY_ACCOUNT, '');
    }

    /**请求登录 */
    Login(account: string, password: string) {
        let login = new C2G_Login();
        login.cmd = 'login';
        login.name = account;
        login.pw = password;
        this.sendProtocolMsg(login);
        this.saveAccount(account);
    }

    /**消息监听 */
    getMessageListeners() {
        return {
            // key为消息名，value为触发函数
            ['G2C_Login']: (msg: any) => { this.LoginSuccess(msg) },
        }
    }

    /**登录成功 */
    LoginSuccess(msg: G2C_Login) {
        UIHelp.ShowTips('登录成功！' + msg.msg);
        EventManager.emit(GameEvent.LOGIN_SUCCESS);
    }
}
