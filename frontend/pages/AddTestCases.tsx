import axios from "axios";
import { useRef } from "react";
import { useParams } from "react-router";
import { getAccessToken } from "../Auth/Tokens";
import { BACKEND_URL } from "../Auth/role";

export function AddTestCases() {
  const { newProblemId } = useParams();
  console.log(newProblemId);
  const VisInputRef = useRef<HTMLTextAreaElement>(null);
  const VisOutputRef = useRef<HTMLTextAreaElement>(null);
  const HidInputRef = useRef<HTMLTextAreaElement>(null);
  const HidOutputRef = useRef<HTMLTextAreaElement>(null);
  function VisAdd() {
    const Input = VisInputRef.current?.value;
    const Output = VisOutputRef.current?.value;
    if (!Input || !Output) alert("VisibleTest Box is empty");
    console.log(Input);
    console.log(Output);
    async function addtest() {
      const result = await axios.post(
        `${BACKEND_URL}/submit/visibletestcase/${newProblemId}`,
        {
          input: Input,
          output: Output,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
          },
        },
      );
      if (result.data) alert("TestCase Added");
      else alert("TestCase failed to add");
      window.location.reload();
    }
    addtest();
  }

  function HidAdd() {
    const Input = HidInputRef.current?.value;
    const Output = HidOutputRef.current?.value;
    if (!Input || !Output) alert("VisibleTest Box is empty");
    async function addtest() {
      const result = await axios.post(
        `${BACKEND_URL}/submit/hiddentestcase/${newProblemId}`,
        {
          input: Input,
          output: Output,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
          },
        },
      );
      if (result.data) alert("TestCase Added");
      else alert("TestCase failed to add");
    }
    addtest();
  }
  return (
    <>
      <div className="w-screen h-screen  flex items-center">
        <div className="w-fit p-2 h-fit   mx-20 flex justify-center items-center rounded-2xl border border-white/50 gap-10">
          <div className=" border border-white/50 h-140 w-130 rounded-xl grid justify-center items-center  ">
            <div className=" w-120 h-10 text-2xl flex justify-center font-sans text-white border border-white/50 rounded">
              VisibleTestCase
            </div>
            <div className=" w-120 h-30 ">
              <textarea
                ref={VisInputRef}
                placeholder="Enter Input"
                className="h-30 w-120 bg-amber-100 border border-white/50 focus:outline-black"
              ></textarea>
            </div>
            <div className=" w-120 h-30 ">
              <textarea
                ref={VisOutputRef}
                placeholder="Enter Output"
                className="h-30 w-120 bg-amber-100 border border-white/50 focus:outline-black"
              ></textarea>
            </div>
            <div className=" w-120 h-30 flex justify-center ">
              <button
                onClick={VisAdd}
                className="bg-sky-300 h-12 w-40 rounded-3xl border border-white/50 hover:animate-pulse hover:cursor-pointer hover:border-black hover:transition delay-75 duration-150 ease-in-out text-xl font-medium"
              >
                ADD
              </button>
            </div>
          </div>
          <div className=" border border-white/50 h-140 w-130 rounded-xl grid justify-center items-center  ">
            <div className=" w-120 h-10 text-2xl flex justify-center font-sans text-white border border-white/50 rounded">
              HiddenTestCase
            </div>
            <div className=" w-120 h-30 ">
              <textarea
                ref={HidInputRef}
                placeholder="Enter Input"
                className="h-30 w-120 bg-amber-100 border border-white/50 focus:outline-black"
              ></textarea>
            </div>
            <div className=" w-120 h-30 ">
              <textarea
                ref={HidOutputRef}
                placeholder="Enter Output"
                className="h-30 w-120 bg-amber-100 border border-white/50 focus:outline-black"
              ></textarea>
            </div>
            <div className=" w-120 h-30 flex justify-center ">
              <button
                onClick={HidAdd}
                className="bg-sky-300 h-12 w-40 rounded-3xl border border-white/50 hover:animate-pulse hover:cursor-pointer hover:border-black hover:transition delay-75 duration-150 ease-in-out text-xl font-medium"
              >
                ADD
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
