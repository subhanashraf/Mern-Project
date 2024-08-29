import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Adminlogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    useEffect(()=>{
        if (localStorage.getItem('token')) {
            navigate('/Adminread')
        }
      },[])
    async function submit(event) {
        event.preventDefault();
        console.log(password, email);

        try {
            let response = await fetch('http://localhost:3000/admin/login', {
                method: 'POST',
                body: JSON.stringify({
                    email: `${email}`,
                    password: `${password}`,
                }),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            });
            let responseText = await response.text();
            console.log(responseText);
         if (responseText) {
            if (responseText.token) {
                localStorage.setItem('token', responseText.token);
                alert('your are login')
            }else{
                console.log('token is not given');
                alert('Email and Password not match')
            }
            if (localStorage.getItem('token')) {
                navigate('/Adminread')
            }
         }else{
            alert('your are worng')
         }

        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred');
        }
    }


    return (
        <>
            <div className="w-full h-screen bg-[#E0E6EC] flex items-center justify-center">
                <div className="artboard phone-1">
                    <h1 className="text-4xl font-bold tracking-normal text-center mt-28">Welcome to <span className="text-blue-400">Scatch</span></h1>
                    <h4 className="font-semibold text-xl my-2">Login your account only admin</h4>
                    <form onSubmit={submit} autocomplete="on">
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path
                                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input type="email" required className="grow" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                      
                        <label className="input input-bordered flex items-center gap-2 my-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clipRule="evenodd" />
                            </svg>
                            <input type="password" required className="grow" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </label>
                        <Link to={'/Adminregister'} className="text-md text-blue-500 block">Create your acount</Link>
                        <button type="submit" className="rounded-2xl border-2 my-4 border-blue-600 bg-blue-300 text-black px-4 py-2">Login</button>
                    </form>
                </div>
            </div>
        </>
    );
}
