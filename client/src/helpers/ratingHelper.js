import {Image} from "react-bootstrap";
import star from "../assets/star.png";
import emptyStar from "../assets/lowstar.png";
import React from "react";
import {createRating} from "../http/deviceApi";
import {toast} from "react-toastify";

export function loadStars(device) {
    const ratings = []
    for (let i = 1; i <= 5; i++) {
        if (i <= device.rating)
            ratings.push(<Image src={star}
                                className="star"
                                key={i}/>)
        else
            ratings.push(<Image src={emptyStar}
                                className="star"
                                key={i}/>)
    }
    return ratings
}

export async function addRating(props) {
    try {
        const {id, rating, loadDevice} = props
        await createRating({
            deviceId: id,
            rate: rating
        }).then(() => loadDevice()).then(() => toast.info("Дякуюємо за оцінку ❤️"))
    } catch (e) {
        toast.error(`${e.response.data.message} ✅`)
    }
}
