import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from "../features/userSlice";
import axios from 'axios';
import "../assets/css/style.css";
import { toast, ToastContainer } from 'react-toastify';


const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [token, setToken] = useState("")
    const [reRender, setReRender] = useState(false);
    const dispatch = useDispatch();

    async function callApi() {
        return axios({
            url: 'https://reqres.in/api/login',
            method: 'post',
            // timeout: 8000,
            data: {
                email: email,
                password: password,
            },
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.data)
            .catch(err => console.error(err))
    }

    useEffect(() => {
        if (email && password) {
            callApi().then((res) => {
                setToken(res.token)
            }
            ).catch((err)=>{
                toast.error("Something went wrong. Try again with correct credentials.")
            })
            setReRender(false)
        }
    }, [!!email, !!password, !!reRender])


    const handleSubmit = (e) => {

        if (token && password.length >= 8) {
            e.preventDefault();
            dispatch(
                login({
                    email: email,
                    password: password,
                    token: token,
                    loggedIn: true
                }))
            localStorage.setItem('token',token)
            // props.history.push("/dashboard")
            
        }
        else if(!email || !password){
            e.preventDefault();
            toast.error("Password or Email should not be null.")

        }
        else if(password.length < 8){
            e.preventDefault();
            toast.error("Password should contains atleast 8 characters.")
            // return
        }
        else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            e.preventDefault();
            toast.error("Invalid email address.")
        //     // return

        }

    }


    return (
        <div className='login'>
            <form className='login_form' onSubmit={(e) => {
                handleSubmit(e)
                setReRender(true)
            }}>
                <h1>Login</h1>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type='submit' className="submit_btn">Submit</button>
                {/* <ToastContainer/> */}

            </form>

        </div>
    )
}

export default Login;