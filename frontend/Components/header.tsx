import { Link } from "react-router-dom";
import { clearAccessToken, getAccessToken } from "../Auth/Tokens";
import { clearRole } from "../Auth/role";

export function NavBar() {
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 
                       w-[90%] max-w-6xl font-serif">

      <div className="flex justify-between items-center px-6 py-3
                      rounded-3xl backdrop-blur-md 
                      bg-gradient-to-t from-[#ffffff] to-[#757a7a] shadow-lg  border
                hover:border-gray-500/80 hover:shadow-gray-500
                transition duration-300">
                        

       {/* logo  */}
        <Link to="/">
          <div className="font-serif flex items-center text-2xl tracking-tight gap-2 cursor-pointer">
            CodeRift
            <span className="h-3 w-3 bg-black animate-spin"></span>
          </div>
        </Link>

        {/* Nav Items */}
        <div className="flex items-center gap-4">

          <div className="px-4 py-1.5 rounded-2xl cursor-pointer hover:bg-black hover:text-white transition">
            Premium
          </div>

          <div className="px-4 py-1.5 rounded-2xl cursor-pointer hover:bg-black hover:text-white transition">
            Explore
          </div>

          <Link to="/problems">
            <div className="px-4 py-1.5 rounded-2xl cursor-pointer hover:bg-black hover:text-white transition">
              Problem
            </div>
          </Link>

          <Link to="/contest">
            <div className="px-4 py-1.5 rounded-2xl cursor-pointer hover:bg-black hover:text-white transition ">
              Contests
            </div>
          </Link>

          {!getAccessToken() ? (
            <Link to="/login">
              <div className="px-4 py-1.5 rounded-2xl cursor-pointer hover:bg-black hover:text-white transition">
                SignIn
              </div>
            </Link>
          ) : (
            <Link to="/">
              <div
                onClick={() => {
                  clearAccessToken();
                  clearRole();
                  window.location.reload();
                }}
                className="px-4 py-1.5 rounded-2xl cursor-pointer hover:bg-black hover:text-white transition"
              >
                Logout
              </div>
            </Link>
          )}

        </div>
      </div>
    </header>
  );
}

