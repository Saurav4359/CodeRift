import { Signup } from "./Signup";
export function Section() {
  return (
    <>
      <section className="bg-[url(../public/main_page.png)] h-screen bg-no-repeat bg-cover bg-center py-20 sm:py-32 flex justify-center items-center "></section>
    </>
  );
}

export function Auth() {
  return (
    <>
      <section className="bg-[url(../public/main_page.png)] h-screen bg-no-repeat bg-cover bg-center py-20 sm:py-32 flex justify-center items-center ">
        <Signup />
      </section>
    </>
  );
}
