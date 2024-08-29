import { useState } from "react";
import { Link } from "react-router-dom";

export default function Usernavbar(params) {
  const [nav,setnav]=useState(false);
  function navcheck(params) {
   setnav(!nav) 
  }
    return(
        <>
       <nav className="px:0 sm:px-4 lg:px-8">
  <div className="navbar bg-base-100">
  <div className="flex-1">
    <Link to={'/Home'} className="btn btn-ghost text-xl">Satch</Link>
  </div>
  <div className="flex-none block sm:hidden" onClick={navcheck}>
    <button className="btn btn-square btn-ghost">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block h-5 w-5 stroke-current">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
      </svg>
    </button>
  </div>
  <div className="flex-none hidden sm:block">
    <ul className="menu menu-horizontal px-1">
      <li><Link to={'/Home'}>Home</Link></li>
      <li> <Link to={'/Userread'}>Product</Link></li>
      <li><a>Card</a></li>
    </ul>
  </div>
</div>
    {nav ? 
    <div className="w-full h-min-full fixed z-10 bg-zinc-500 sm:hidden">
      <ul className="menu text-white text-xl text-center px-1">
      <li><Link to={'/Home'}>Home</Link></li>
      <li> <Link to={'/Userread'}>Product</Link></li>
      
    </ul>
    </div>
    : console.log('bye')
     }
  </nav>
        </>
    );
    
}