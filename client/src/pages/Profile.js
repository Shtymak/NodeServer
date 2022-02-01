// import React, {useContext, useEffect, useState} from 'react';
// import {Context} from "../index";
// import {check, fetchUserDevices} from "../http/userAPI";
// import {observer} from "mobx-react-lite";
// import {useHistory} from "react-router-dom";
// import {DEVICE_ROUTE, SHOP_ROUTE} from "../utils/consts";
// import {Button, Container} from "react-bootstrap";
// import UserDeviceList from "../components/Profile/UserDeviceList";
//
// const Profile = observer(() => {
//     const {user} = useContext(Context)
//     const history = useHistory()
//     const logOut = () => {
//         user.setUser({})
//         user.setIsAuth(false)
//         localStorage.setItem('token', '')
//         history.push(SHOP_ROUTE)
//     }
//     const loadUser = () => check().then(data => {
//         user.setUser(data)
//         user.setIsAuth(true)
//     })
//     const loadUserDevices = () =>
//         fetchUserDevices().then(data => user.setDevices(data.rows || []))
//
//     useEffect(async () => {
//         await loadUser()
//         await loadUserDevices()
//     }, [])
//     const [show, setShow] = useState(false);
//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true)
//     const currentUser = user.data
//     return (
//         <div>
//             <Container>
//                 Профіль: {currentUser.email}
//                 <UserDeviceList show={show} handleClose={handleClose}/>
//                 <Button>Додати новий товар</Button>
//                 <Button variant="primary" onClick={handleShow}>
//                     Мої публікації
//                 </Button>
//                 <Button onClick={() => logOut()}>Вийти</Button>
//             </Container>
//         </div>
//     );
// });
//
// export default Profile;
