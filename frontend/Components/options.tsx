import { useEffect, useRef } from "react";

export function Option({ setRef }: any) {
  const langRef = useRef<HTMLSelectElement | null>(null);
  if (langRef.current) setRef(langRef.current.value);
  return (
    <>
      <select
        onChange={() => {
          setRef(langRef.current?.value);
        }}
        ref={langRef}
        name=""
        id=""
        className="w-22 h-8 focus:outline-white/  border border-white/40 hover:cursor-pointer rounded-xl "
      >
        <option value="cpp">C++</option>
        <option value="javascript">Javascript</option>
        <option value="java">Java</option>
        <option value="c">C</option>
      </select>
    </>
  );
}
