import DataModel from "../DataModel";

export default class SystemModel extends DataModel {
    is_open_music: boolean = false;
    is_open_sound: boolean = false;

    constructor() {
        super('system');
    }

    getMessageListeners() {
        return {
        }
    }
}