import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from "../features/userSlice";
import axios from 'axios';
import LoadingSpinner from "./LoadingSpinner";
import "../assets/css/style.css";

const Dashboard = (props) => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);


    useEffect(() => {
        getAllNodes();
    }, []);

    const getAllNodes = async () => {
        const res = await axios.get("https://reqres.in/api/users/");
        setUsers(res.data.data);
        setLoading(false);
    };


    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout())
        localStorage.removeItem('token')
        // props.history.push("/login")
    }

    // if (isLoading) {
    //     return <div className="App">Loading...</div>;
    // }


    return (
        <>
            {
                isLoading ? <LoadingSpinner /> :
                    (<>

                        <div className='logout'>
                            <h4>Welcome to Dashboard <span className='user_email'>{user.email}</span></h4>
                            <button className='logout_button' onClick={(e) => handleLogout(e)}>Logout</button>
                        </div>
                        <div>
                            <h3 className='headingReqRes'>Following is the data of other Reqres Users</h3>
                        </div>
                        <div className="flex">
                            {users.length &&
                                users.map((user) => {
                                    return (
                                        <div key={user.id}>
                                            <p>
                                                <strong>{user.first_name}</strong>
                                            </p>
                                            <p>{user.email}</p>
                                            <img key={user.avatar} src={user.avatar} />
                                        </div>
                                    );
                                })}
                        </div>

                    </>)
            }
        </>
    )
}

export default Dashboard
