 
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../Auth/Tokens";
import { Login } from "./Login";
import { Signup } from "./Signup";

export function Section() {
  const navigate = useNavigate();
  return (
    <>
      <section className="relative h-screen flex items-center justify-center">
        <img
          src="../public/main_page.png"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        {/* Optional Overlay */}
        <div className=" font-serif absolute inset-0 bg-black/50 flex justify-center items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight max-w-3xl">
              Master Coding.
              <span className="text-gray-400"> Compete. Improve.</span>
            </h1>
            <p className="text-gray-400 mt-6 max-w-xl">
              Solve real-world problems, compete with developers, and level up
              your skills.
            </p>
            <div className="mt-8 flex gap-4 relative">
              <button className="bg-gray-700 px-6 py-3 rounded-lg text-white  transition">
                Get Started
              </button>

              <button
                onClick={() => {
                  if (getAccessToken()) return navigate("/problems");
                  else
                    navigate('/signup');
                }}
                className="border border-gray-600 px-6 py-3 rounded-lg text-gray-300 hover:bg-gray-500/20 hover:text-white hover:cursor-pointer hover:border-white transition"
              >
                Explore Problems
         
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


export function SignupPage() {
  return (
    <>
      <section className="bg-[url(../public/main_page.png)] h-screen bg-no-repeat bg-cover bg-center py-20 sm:py-32 flex justify-center items-center flex-wrap ">
        <Signup />
      </section>
    </>
  );
}

export function LoginPage() {
  return (
    <>
      <section className="bg-[url(../public/main_page.png)] h-screen bg-no-repeat bg-cover bg-center py-20 sm:py-32 flex justify-center items-center flex-wrap">
        <Login />
      </section>
    </>
  );
}

 
 
