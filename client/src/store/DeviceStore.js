import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = [
            {id: 1, name: "Type#1"},
            {id: 2, name: "Type#2"}
        ]
        this._brands = [
            {id: 1, name: "Brand#1"},
            {id: 2, name: "Brand#2"},
            {id: 3, name: "Brand#3"},
            {id: 4, name: "Brand#4"},
            {id: 5, name: "Brand#5"},
            {id: 6, name: "Brand#6"},
            {id: 7, name: "Brand#7"},
            {id: 8, name: "Brand#8"},
            {id: 9, name: "Brand#9"},
        ]
        this._devices = [
            {
                id: 1,
                name: "12 pro",
                price: 12000,
                rating: 5,
                img: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MHLN3?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1601352338000"
            },
            {
                id: 1,
                name: "12 pro",
                price: 12000,
                rating: 5,
                img: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MHLN3?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1601352338000"
            }
            , {
                id: 1,
                name: "12 pro",
                price: 12000,
                rating: 5,
                img: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MHLN3?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1601352338000"
            }
            ,
            {
                id: 1,
                name: "12 pro",
                price: 12000,
                rating: 5,
                img: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MHLN3?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1601352338000"
            },
            {
                id: 1,
                name: "12 pro",
                price: 12000,
                rating: 5,
                img: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MHLN3?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1601352338000"
            }


        ]
        this._selectedType = {}
        this._selectedBrand = {}
        makeAutoObservable(this)
    }


    get selectedBrand() {
        return this._selectedBrand;
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
