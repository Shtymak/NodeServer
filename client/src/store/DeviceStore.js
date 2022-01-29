import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = []
        this._brands = []
        this._devices = []
        this._selectedType = {}
        this._selectedBrand = {}
        this._sortBy = () => (a, b) => a.name >= b.name ? 1 : -1
        makeAutoObservable(this)
    }




    get selectedBrand() {
        return this._selectedBrand;
    }

    setSelectedBrand(value) {
        this._selectedBrand = value;
    }

    get types() {
        return this._types.slice().sort(this._sortBy())
    }

    setTypes(value) {
        this._types = value;
    }

    get brands() {
        return this._brands.slice().sort(this._sortBy());
    }

    setBrands(value) {
        this._brands = value;
    }

    get devices() {
        return this._devices.slice().sort((a, b) => a.typeId >= b.typeId ? 1 : -1);
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
