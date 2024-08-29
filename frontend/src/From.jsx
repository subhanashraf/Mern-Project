
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Usernavbar from "./Compounent/Usernavbar";
export default function From() {
    const [name, setname] = useState('');
    const [price, setprice] = useState('');
    const [discount, setdiscount] = useState('');
    const [url, seturl] = useState('');

    const navigation = useNavigate()
function submit(params) {
    alert('Thank complete this form and i am some time contact you')
}
    return (
        <>
        <Usernavbar/>
            <div className="flex w-full ">
                <div className=" w-full p-1 sm:p-10">
                    <h1 className="text-3xl">Custom Detail</h1>
                    <form className="space-x-2 sm:space-x-10 space-y-6">
                        <input value={name} onChange={(e) => setname(e.target.value)} type="text" required placeholder=" Name" className="input input-bordered w-full max-w-xs" />
                        <input value={price} onChange={(e) => setprice(e.target.value)} type="text" required placeholder="Email"className="input input-bordered w-full max-w-xs" />
                        <input value={discount} onChange={(e) => setdiscount(e.target.value)} type="text" required placeholder="Address" className="input input-bordered w-full max-w-xs" />
                        <button onClick={submit} className="btn btn-neutral block">Submit </button>
                    </form>
                </div>
            </div>
        </>
    )

}