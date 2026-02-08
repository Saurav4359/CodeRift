import { useState } from "react";
import { Close } from "../lib/close";
import { Eye } from "../lib/eye";
import { Google } from "../lib/google";
import { EyeClosed } from "../lib/eyeClosed";
import { Link } from "react-router";

export function Signup() {
  const [ShowPass, setShowPass] = useState(false);
  function ShowPassword() {
    setShowPass((ShowPass) => !ShowPass);
  }
  return (
    <>

    
       <div className="flex my-35 mx-100 absolute"> 
        <div className="bg-white/90 backdrop-blur-xs   h-150 w-180 rounded-2xl p-2 border-solid border-black/60 border ">
          <div className=" h-48 border-black ">
            <div className="h-11 w-full flex justify-between items-center ">
              <div className=" text-xl  h-10 w-50 flex justify-center items-center ml-10 pointer-events-none ">
                My Acccount
              </div>
              <div className=" select-none h-10 w-20 flex justify-center items-center">
                <div className="cursor-pointer hover:text-black/50" >
                 <Link to="/" >  <Close /></Link>
                </div>
              </div>
            </div>
            <div className=" h-10 w-80  font-stretch-130% flex justify-baseline items-baseline-last pl-10 ml-44 pointer-events-none">
              I already have my account
            </div>
            <div className=" h-18 flex items-center ml-38">
              <button className=" h-13 w-100 flex justify-center items-center border border-gray-600 rounded-4xl gap-1 hover:bg-gray-300 hover:border-black  ">
                <Google />
                Sign in to Google
              </button>
            </div>
            <div className=" h-10 flex justify-center items-center">Or</div>
          </div>

          <div className=" h-46  border-black ">
            <div className="h-3 w-full  flex items-center justify-end pr-36 pt-3 font-thin text-sm">
              Required Fields*
            </div>
            <div className="h-3 w-full  flex items-center justify-start pl-38 font-thin text-sm">
              Login*
            </div>
            <div className=" h-14 flex justify-center items-center mb-2">
              <input
                className=" h-12 w-100 border border-black/50 rounded  flex items-center px-2 hover:border-black focus:outline-black "
                placeholder="Email"
                type="text"
                name=""
                id=""
              />
            </div>
            <div className="h-3 w-full  flex items-center justify-start pl-38 font-thin text-sm">
              Password*
            </div>
            <div className=" h-14 flex justify-center items-center">
              {ShowPass ? (
                <>
                  <input
                    className=" h-12 w-100 border border-black/50 rounded  flex items-center px-2 hover:border-black focus:outline-black"
                    placeholder="Password"
                    type="text"
                    name=""
                    id=""
                  />
                  <button
                    onClick={ShowPassword}
                    className="cursor-pointer absolute flex items-center ml-88 focus:outline-black"
                  >
                    <Eye />
                  </button>
                </>
              ) : (
                <>
                  <input
                    className=" h-12 w-100 border border-black/50 rounded   flex items-center px-2 hover:border-black focus:outline-black"
                    placeholder="Password"
                    type="password"
                    name=""
                    id=""
                  />
                  <button
                    onClick={ShowPassword}
                    className="cursor-pointer absolute flex items-center ml-88 focus:outline-black"
                  >
                    <EyeClosed />
                  </button>
                </>
              )}
            </div>
            <div className=" cursor-pointer h-3 flex items-center  justify-start pl-38 font-thin underline text-sm ">
              <span className=" hover:text-gray-500">   Forgot Your Password?</span>
            
            </div>
          </div>

          <div className="   h-50  border-black ">
            <div className=" h-15  flex justify-center items-center">
              <button className="h-12 w-80 bg-black rounded-4xl text-white font-stretch-100% hover:border hover:border-gray-300 cursor-pointer">
                Sign In
              </button>
            </div>
            <div className="  h-32 mt-5 border-t border-slate-500 font-thin m-40">
              I don't have my CodeNest account.
              <div className=" h-18 flex justify-center items-center">
                <button className="h-12 w-80 bg-black text-white rounded-4xl font-medium hover:border hover:border-gray-300 cursor-pointer">
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
        
    </>
  );
}
