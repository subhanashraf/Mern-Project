import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Usernavbar from "./Compounent/Usernavbar";

export default function Home(params) {
  const navigation = useNavigate();
  
  async function check() {
   if (localStorage.getItem('token')) {
       
       let token = localStorage.getItem('token')
       let respone = await fetch('http://localhost:3000/user/verifyuser',{
           method:'Post',
           body:JSON.stringify({
               token:`${token}`
           }),
           headers: {
               'Content-Type': 'application/json; charset=UTF-8',
           }
       })
       let result = await respone.json()
       console.log(result.message);
       
       if (result.message) {
           console.log('This is user');
       }
       else{
           navigation('/')

       }
   }
   else{
       navigation('/')
   }
   }    
   useEffect(()=>{
       check();
   },[])

   function shoppage(params) {
    return navigation('/UserRead')
   }

    function submit() {
      localStorage.clear()
      if (!localStorage.getItem('token')) {
        navigation('/')
    }
    }
    return(
        <>
        <Usernavbar/>
        <div className="w-full h-screen bg-gradient-to-t from-zinc-600 to-white  gap-10 text-zinc-600 flex flex-col items-center justify-center  ">
            <div className=" w-96  text-center  ">
                 <h1 className="  text-6xl leading-snug font-manrope font-extrabold"> Welcome to <span className="bg-gradient-to-t from-blue-500 to-whit inline-block text-transparent bg-clip-text"> Stact </span></h1>
                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, impedit Accusamus, tempore. Illum, id iste atque iusto iure modi itaque!</p>
                 </div>
            
            <div><Link to={'/UserRead'} className="rounded-2xl  my-4  bg-gradient-to-t from-blue-500 to-whit text-black px-4 py-2" >GO to Shop </Link></div>
        </div>
        {/* <div className="w-full">

        </div> */}
          {/* <button onClick={submit} className="rounded-2xl border-2 my-4 border-blue-600 bg-blue-300 text-black px-4 py-2">Logout</button>
          <button  onClick={shoppage} className="rounded-2xl border-2 my-4 border-blue-600 bg-blue-300 text-black px-4 py-2">Shop</button>
          <Link to={'/UserRead'}> shop</Link> */}
        </>
    )
    
}