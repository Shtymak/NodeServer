import {makeAutoObservable} from "mobx";

export default class BasketStore {
    constructor() {
        this._basketDevices = []
        makeAutoObservable(this)
    }

    get basketDevices() {
        return this._basketDevices;
    }

    setBasketDevices(value) {
        this._basketDevices = value;
    }
}
