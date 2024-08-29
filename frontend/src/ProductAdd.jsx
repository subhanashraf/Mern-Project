
import { useEffect, useState } from "react"
import Adminnavbar from "./Compounent/adminnavbar"
import { useNavigate } from "react-router-dom";
export default function ProductAdd() {
    const [name, setname] = useState('');
    const [price, setprice] = useState('');
    const [discount, setdiscount] = useState('');
    const [url, seturl] = useState('');
    const [color, setcolor] = useState('');
    const [text, settext] = useState('');
    const [panelcolor, setpanelcolor] = useState('');

    const navigation = useNavigate()

    async function check() {
        if (localStorage.getItem('token')) {

            let token = localStorage.getItem('token')
            let respone = await fetch('http://localhost:3000/admin/verify', {
                method: 'Post',
                body: JSON.stringify({
                    token: `${token}`
                }),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            })
            let result = await respone.json()
            if (result.message) {
                console.log('This is admin');
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

    async function submit(event) {
        event.preventDefault();

        try {
            let response = await fetch('http://localhost:3000/admin/create', {
                method: 'POST',
                body: JSON.stringify({
                    name: `${name}`,
                    price: `${price}`,
                    discount: `${discount}`,
                    url: `${url}`,
                    color: `${color}`,
                    text: `${text}`,
                    panelcolor: `${panelcolor}`,
                }),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            });
            let responseText = await response.json();
            if (responseText.message) {
                alert(responseText.message)
                navigation('/Adminread')
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred');
        }
    }
    // localStorage.getItem('token')


    return (
        <>
            <Adminnavbar />
            <div className="flex w-full ">
                <div className=" w-full p-1 sm:p-10">
                    <h1 className="text-3xl">Create Product</h1>
                    <form className="mx-auto ">

                        <div className="inline-block w-80 my-4 mx-2">
                            <label for="pname" className="  block">Product Name</label>
                            <input id="pname" value={name} onChange={(e) => setname(e.target.value)} type="text" minLength={4} maxLength={10} required placeholder="Product Name" className="input input-bordered w-full me-2 max-w-xs" />
                        </div>
                        <div className="inline-block w-80 my-4 mx-2">
                            <label for="price" className="block ">Product Price</label>
                            <input id="price" value={price} onChange={(e) => setprice(e.target.value)} type="text" required placeholder="Product Price" className="input input-bordered w-full me-2 max-w-xs" />
                        </div>
                        <div className="inline-block w-80 my-4 mx-2">
                        <label for="Discount" className="block ">Product Price</label>
                        <input id="Discount" value={discount} onChange={(e) => setdiscount(e.target.value)} type="text" required placeholder="Product discount" className="input input-bordered me-2 w-full max-w-xs" />
                </div>
                <div className="inline-block w-80 my-4 mx-2">
                <label for="Url" className="block ">Url</label>
                <input value={url} id="Url" onChange={(e) => seturl(e.target.value)} type="text" required placeholder="only imgae url" className="input input-bordered w-full me-2 max-w-xs my-4" />
            </div>
            <h1 className="text-xl my-5">More infortion</h1>
            <div className="inline-block align-middle mx-4 ">
                <label for="background" className=" mt-4">Background Color</label>
                <input id="background" value={color} onChange={(e) => setcolor(e.target.value)} type="color" required placeholder="Background Color" className=" me-2 " />
            </div>
            <div className="inline-block align-middle mx-4 ">
                <label for="textcolor" className=" mt-4">Text Color</label>
                <input id="textcolor" value={text} onChange={(e) => settext(e.target.value)} type="color" required placeholder="Text Color" className="me-" />
            </div>
            <div className="inline-block align-middle mx-4 ">
                <label for="panelcolr" className=" mt-4">Panel Color </label>
                <input id="panelcolr" value={panelcolor} onChange={(e) => setpanelcolor(e.target.value)} type="color" required placeholder="Panel Color" className=" me-2 " />
            </div>

            <button onClick={submit} className="btn btn-neutral block my-4">Create Product </button>
        </form >
                </div >
            </div >
        </>
    )

}