import  {MySolutionBar} from "../Components/Mysolution";
export function MySubmission() {
  return (
    <>
      <div className="w-screen h-screen  ">
        <div className="   min-h w-full my-25 flex justify-center ">
          <div className=" w-350   my-5 rounded grid gap-2 p-2 border border-white/40   ">
            <div className="h-13 w-full  border border-white/40 rounded flex justify-center items-center gap-1 text-red-500 bg-white/10 font-semibold mask-t-from-neutral-100 ">
              <div className=" h-12 w-48 border-r border-white/40 flex justify-center items-center text-xl">
                When
              </div>
              <div className=" h-12 w-48 border-r border-white/40 flex justify-center items-center text-xl">
                Who
              </div>
              <div className=" h-12 w-48 border-r border-white/40 flex justify-center items-center text-xl">
                Problem
              </div>
              <div className=" h-12 w-48 border-r border-white/40 flex justify-center items-center text-xl">
                Lang
              </div>
              <div className=" h-12 w-48 border-r border-white/40 flex justify-center items-center text-xl">
                Verdict
              </div>
              <div className=" h-12 w-48 border-r border-white/40 flex justify-center items-center text-xl">
                Time
              </div>
              <div className=" h-12 w-48   flex justify-center items-center text-xl">
                Memory
              </div>
            </div>
            {/* <MySolutionBar/> */}
             
                
          </div>
        </div>
      </div>
    </>
  );
}
