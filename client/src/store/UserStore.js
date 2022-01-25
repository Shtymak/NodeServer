import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        makeAutoObservable(this)
    }

    setIsAuth(value) {
        this._isAuth = value
    }

    setUser(user) {
        this._user = user
    }


    get isAuth() {
        return this._isAuth;
    }

    get user() {
        return this._user;
    }

    getId(){
        return this._user.id
    }
}
