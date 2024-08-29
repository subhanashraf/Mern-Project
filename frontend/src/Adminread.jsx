import { useEffect, useState } from "react"
import Adminnavbar from "./Compounent/adminnavbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Adminread(params) {
    const [result, setresult] = useState([])

    const navigation = useNavigate()

   async function check() {
    if (localStorage.getItem('token')) {
        
        let token = localStorage.getItem('token')
        let respone = await fetch('http://localhost:3000/admin/verify',{
            method:'Post',
            body:JSON.stringify({
                token:`${token}`
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        })
        let result = await respone.json()
        if (result.message) {
            console.log(result.message);
        }
        else{
            localStorage.clear()
            navigation('/')
        }
    }
    else{
        localStorage.clear()
        navigation('/')
    }
    }    
    useEffect(()=>{
        check();
    },[])


    async function apicall() {
        try {
            let response = await fetch('http://localhost:3000/admin/read')
            let responseText = await response.json();
            setresult(responseText.data)

        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred read');
        }
    }
    async function produnctdelete(e) {
        console.log(e);
        
        try {
            let response = await fetch(`http://localhost:3000/admin/delete/${e}`, {
                method: 'Delete',
            });
            let responseText = await response.json();
           if (responseText.message) {
            alert(responseText.message)
           }
         
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred Delete');
        }
    }


    useEffect(() => {
        apicall()
    }, [])
    return (
        <>
            <Adminnavbar />
            {result.length > 0 ? (
                <div className="flex  w-full  gap-2 justify-evenly p-5 flex-wrap">{
                    result.map((element, index) => (
                        <div key={index} >
                            <div className="card card-compact bg-base-100 w-64 shadow-xl" style={{ color: element.text }}>
                                <figure>
                                    <img className="w-full h-40" src={element.url} alt="url is not correct" />
                                </figure>
                                <div className="card-body" style={{ backgroundColor: element.panelcolor }} >
                                    <h2 className="card-title font-medium" >{element.name} </h2>
                                    <p className="text-xl font-semibold">Price:{element.price} </p>
                                    <div className="card-actions justify-evenly">
                                    <button onClick={() => produnctdelete(element._id)}>Delete</button>
                                    <Link to={`/Updata/${element._id}`}>Edite</Link>
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