import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._isAdmin = false
        this._data = {}
        this._devices = []
        makeAutoObservable(this)
    }

    setIsAdmin(value) {
        const query = value.role === "ADMIN"
        this._isAdmin = query
    }

    get isAdmin() {
        return this._isAdmin
    }

    setIsAuth(value) {
        this._isAuth = value
    }

    setUser(user) {
        this._data = user
    }


    get isAuth() {
        return this._isAuth;
    }

    get data() {
        return this._data;
    }

    getId() {
        return this._data.id
    }

    getUserData() {
        return this._data
    }

    setDevices(value) {
        this._devices = value
    }

    get devices() {
        return this._devices
    }
}
