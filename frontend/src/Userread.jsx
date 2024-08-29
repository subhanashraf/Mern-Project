import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Usernavbar from "./Compounent/Usernavbar";
export default function Userread(params) {
    const [result, setresult] = useState([])

    const navigation = useNavigate();

    async function check() {
        if (localStorage.getItem('token')) {

            let token = localStorage.getItem('token')
            let respone = await fetch('http://localhost:3000/user/verifyuser', {
                method: 'Post',
                body: JSON.stringify({
                    token: `${token}`
                }),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            })
            let result = await respone.json()
            if (result) {

            }
            else {
                navigation('/')
            }
        }
        else {
            navigation('/')
        }
    }
    useEffect(() => {
        check();
    }, [])


    async function apicall() {
        try {
            let response = await fetch('http://localhost:3000/user/read')
            let responseText = await response.json();
            setresult(responseText.data)

        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred');
        }
    }


    useEffect(() => {
        apicall()
    }, [])

    return (
        <>
   <Usernavbar />
   {result.length > 0 ? (
       <div className="flex  gap-2 justify-evenly  p-5 flex-wrap">{
           result.map((element, index) => (
               <div key={index} >
                   <div className="card card-compact bg-base-100 w-64 shadow-xl" style={{ color: element.text }}>
                       <figure>
                           <img className="w-full h-40 " src={element.url} alt="url is not correct" />
                       </figure>
                       <div className="card-body" style={{ backgroundColor: element.panelcolor }} >
                           <h2 className="card-title font-medium" >{element.name} </h2>
                           <p className="text-xl font-semibold">Price:{element.price} </p>
                           <div className="card-actions justify-end">
                               <Link to={`/Productinfo/${element._id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center" style={{ backgroundColor: element.color }}>   Read more
                                       <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10" >
                                       <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                   </svg>
                               </Link>
                           </div>
                       </div>
                   </div>
               </div>
           ))
       }
       </div>
   ) : (
       <p className="text-xl text-zinc-400">No data available</p>
            )}
        </>
    )
}