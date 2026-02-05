import { Link } from "react-router-dom";

export function NavBar() {
  
  return (
    //  bg-linear-to-bl from-[#ceff8a]/90 to-[#9bffd7]/90
    <header className="  h-14 w-min flex justify-between items-center fixed   border-black mx-25 my-5 rounded-3xl backdrop-blur-xs inset-0  bg-linear-to-tl from-[#7df9fb]  to-[#d8ffcd] opacity-90 ">
      <div className="ml-40  h-16 w-70 font-semibold flex justify-center items-center text-3xl subpixel-antialiased  tracking-tighter   gap-2  hover:cursor-pointer">
       <Link to="/">CodeRift </Link>  
        <span className="mt-1 h-4 w-4 bg-black  animate-spin "></span>
      </div>
      <div className=" mr-20 h-14 w-180 flex justify-center items-center gap-5 mt-1">
        <div className="text-l font-medium hover:cursor-pointer h-8 w-22 rounded-2xl flex justify-center items-center hover:bg-black hover:text-white hover:transition delay-75 duration-100 ease-in">
          Premium
        </div>
        <div className="text-l font-medium hover:cursor-pointer h-8 w-20 rounded-2xl flex justify-center items-center hover:bg-black hover:text-white hover:transition delay-75 duration-100 ease-in  ">
          Explore
        </div>
        <div className="text-l font-medium hover:cursor-pointer h-8 w-22 rounded-2xl flex justify-center items-center hover:bg-black hover:text-white hover:transition delay-75 duration-100 ease-in">
          <Link to="/problems">Problem</Link>
        </div>
        <div className="text-l font-medium hover:cursor-pointer h-8 w-22 rounded-2xl flex justify-center items-center hover:bg-black hover:text-white hover:transition delay-75 duration-100 ease-in">
          Contests
        </div>
        <div className="text-l font-medium hover:cursor-pointer h-8 w-20 rounded-2xl flex justify-center items-center hover:bg-black hover:text-white hover:transition delay-75 duration-100 ease-in">
          <Link to="/signup"> SignIn</Link>
        </div>
      </div>
    </header>
  );
}
