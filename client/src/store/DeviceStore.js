import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = []
        this._brands = []
        this._devices = []
        this._ratings = []
        this._selectedType = {}
        this._selectedBrand = {}
        makeAutoObservable(this)
    }


    get selectedBrand() {
        return this._selectedBrand;
    }


    get rating() {
        return this._ratings;
    }

    setRating(value) {
        this._ratings = value;
    }

    setSelectedBrand(value) {
        this._selectedBrand = value;
    }

    get types() {
        return this._types;
    }

    setTypes(value) {
        this._types = value;
    }

    get brands() {
        return this._brands;
    }

    setBrands(value) {
        this._brands = value;
    }

    get devices() {
        return this._devices;
    }

    setDevices(value) {
        this._devices = value;
    }

    get selectedType() {
        return this._selectedType;
    }

    setSelectedType(value) {
        this._selectedType = value;
    }
}
