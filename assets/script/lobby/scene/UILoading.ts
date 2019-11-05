import auto_loading from "../AutoUI/scene/auto_loading";
import UIBase from "../../core/uiManager/UIBase";
import UIHelp from "../../core/uiManager/UIHelp";
import GameController from "../../core/GameController";
import EventManager from "../../core/eventmanager/EventManager";
import { SocketEvent, GameEvent } from "../../core/const/EventConst";
import GameDataCenter from "../../core/GameDataCenter";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/scene/UILoading")
export default class UILoading extends UIBase {
	ui: auto_loading = null;

	protected static prefabUrl = "db://a";
	protected static className = "UILoading";

	onUILoad() {
		this.ui = this.node.addComponent(auto_loading);

		this.ui.loginNode.active = false;
	}

	onShow() {
		// 监听btn_login点击事件
		this.onRegisterEvent(this.ui.btn_login, this.onLogin, this);
		EventManager.on(SocketEvent.SOCKET_OPEN, this.onSocketOpen, this);
		EventManager.on(GameEvent.LOGIN_SUCCESS, this.onLoginSuccess, this);
	}

	onHide() {
		// 取消监听btn_login点击事件
		this.unRegisterEvent(this.ui.btn_login, this.onLogin, this);
		EventManager.off(SocketEvent.SOCKET_OPEN, this.onSocketOpen, this);
		EventManager.off(GameEvent.LOGIN_SUCCESS, this.onLoginSuccess, this);
	}

	onStart() {
		// 游戏初始化
		GameController.init();
		// 连接网络
		GameController.network.connect();
	}

	onSocketOpen() {
		this.ui.loginNode.active = true;
		// 读取缓存账号
		let account = GameDataCenter.account.getAccount();
		if (account != '') {
			this.ui.edit_account.getComponent(cc.EditBox).string = account;
		}
	}

	onLogin() {
		let account = this.ui.edit_account.getComponent(cc.EditBox).string;
		let password = this.ui.edit_password.getComponent(cc.EditBox).string;
		
		GameDataCenter.account.Login(account, password);
	}

	onLoginSuccess() {
		cc.director.loadScene("lobby");
	}
}
