import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Usernavbar from "./Compounent/Usernavbar";
export default function Productinfo() {
    const param = useParams();
    const [result, setresult] = useState([])
    async function api() {
        try {
            let response = await fetch(`http://localhost:3000/user/peoductinfo/${param.id}`)
            let responseText = await response.json();
            if (responseText) {
                setresult(responseText.data)
                console.log(result[0]);
                
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred');
        }
    }
    useEffect(() => {
        api()
    }, [])

    let local = localStorage.getItem('Shop Bag');
    console.log(local);

// function addtocard() {
//     localStorage.setItem(result[0].name,param.id)
//     alert('Product add to card')
// }
    return (
<>
 <Usernavbar/>
   {result.length > 0 ? (
       <div className="bg-gradient-to-t from-zinc-600 to-white  h-screen w-full" >
           {result.map((element, index) => (
               <div key={index} >
                   <div className="w-1/2 mx-auto p-10 flex gap-2 p-x-10 justify-center bg-slate-400  items-center mt-10  flex-wrap overflow-y-hidden"   >
                   <div className="max-w-md w-full lg:flex gap-10 justify-between">
                       <div className="h-48 lg:h-auto lg:w-52 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center bg-center bg-black  overflow-hidden" style={{ backgroundImage: `url(${element.url})` }} title="Woman holding a mug">
                       </div>
                       <div className="">
                           <div className="mt-10" >
                           <p>Price Breakdown</p>
                               <div className="flex justify-between mb-2">
                                   <span>Total MRP:</span>
                                   <span>₹920</span>
                               </div>
                            <div className="flex justify-between mb-2">
                                <span>Discount on MRP:</span>
                                <span>₹0</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Platform Fee:</span>
                                <span>₹20</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Shipping Fee:</span>
                                <span>Free</span>
                     </div>
                        <hr className="my-2" />
                        <div className="flex justify-between">
                            <span className="font-semibold">Total Amount:</span>
                            <span className="font-semibold">₹1940</span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="text-sm">
                        <button   className="rounded-md border-2 my-4  bg-blue-300 text-black px-4 py-2" style={{backgroundColor:element.color }}>Buy</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    ))
                    }
                </div>
            ) : (<p className="text-xl text-zinc-400">No data available</p>)}
        </>
    );

}