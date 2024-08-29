import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Adminregister() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [check, setcheck] = useState(false);
    const navigate = useNavigate();

  useEffect(()=>{
    if (localStorage.getItem('token')) {
        navigate('/Adminread')
    }
  },[])
    async function submit(event) {
        event.preventDefault();

        try {
            let response = await fetch('http://localhost:3000/admin/createadmin', {
                method: 'POST',
                body: JSON.stringify({
                    name: `${name}`,
                    email: `${email}`,
                    password: `${password}`,
                    tellsomething: `hello`,
                }),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            });
            let responseText = await response.json();
            if (responseText.token) {
                localStorage.setItem('token', responseText.token);
                alert('Admin acount create')
            }else{
                console.log('token is not given');
                alert('Admin acount not create')
            }
            if (localStorage.getItem('token')) {
                navigate('/Adminread')
            }
            console.log(responseText);
           
            

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
                    <h4 className="font-semibold text-xl my-2">Create your account only admin</h4>
                    <form autocomplete="on" >
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
                            <input type="email" required  className="grow" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 my-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                            </svg>
                            <input type="text" required minLength={4} maxLength={10} className="grow my-4" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
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
                            <input type="password" required minLength={3} maxLength={10} className="grow" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </label>
                        <Link to={'/Adminlogin'} className="text-md text-blue-500 block">Already acount</Link>
                        <button type="submit" className="rounded-2xl border-2 my-4 border-blue-600 bg-blue-300 text-black px-4 py-2" onClick={submit}>Create your account</button>
                    </form>
                </div>
            </div>
        </>
    );
    
}
