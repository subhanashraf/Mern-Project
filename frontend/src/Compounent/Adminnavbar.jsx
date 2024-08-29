import { Link } from "react-router-dom";

export default function Adminnavbar(params) {
    return(
        <>
       <nav className="px:0 sm:px-4 lg:px-8">
  <div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="flex-none block sm:hidden">
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
      <li><Link to={'/AddProduct'}> Create Product </Link></li>
      <li> <Link to={"/Adminread"}> Product</Link></li>
    </ul>
  </div>
</div>
  </nav>  
        </>
    );
    
}