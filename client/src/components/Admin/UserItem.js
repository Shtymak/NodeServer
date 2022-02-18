import React from 'react';
import {observer} from "mobx-react-lite";
import "../../modules/UserItem.css"
import remove from "../../assets/trash.png"
import {Image} from "react-bootstrap";
import {ToastContainer} from "react-toastify";
import {deleteUser} from "../../helpers/userHelper";

const UserItem = observer(({user, destroyUser}) => {

    return (
        <div className="item-box">
            {user.email}
            <Image src={remove}
                   className="icon"
                   onClick={() => deleteUser({user, destroyUser})}
            />
            <ToastContainer/>
        </div>
    );
});

export default UserItem;
