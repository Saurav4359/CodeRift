import { NavBar } from "../Components/header";
import { Footer } from "../Components/Footer";
import { Outlet } from "react-router";
export function Layout() {
  return (
    <>
      <NavBar />
      <Outlet/>
    
    </>
  );
}
