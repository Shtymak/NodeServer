import React from 'react';
import {observer} from "mobx-react-lite";
import UserItem from "./UserItem";
import {deleteUser} from "../../http/userAPI";

const UserList = observer(({user}) => {
    async function destroyUser({id}) {
        user.setUsers(user.users.filter(user => id !== user.id))
        await deleteUser(id)
    }

    return (
        <div>
            {user.users.map(user => <UserItem
                user={user}
                key={user.id}
                destroyUser={destroyUser}
            />)}
        </div>
    );
});

export default UserList;
