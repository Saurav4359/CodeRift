import { useRef } from "react";
import type { langtype } from "./Submission";
type Props = {
  setRef: React.Dispatch<React.SetStateAction<"java" | "javascript" | "c" | "cpp">>;
};
export function Option({ setRef }: Props ) {
  const langRef = useRef<HTMLSelectElement | null>(null);
  if (langRef.current) setRef(langRef.current.value as langtype);
  return (
    <>
      <select
        onChange={() => {
          if (langRef.current) setRef(langRef.current?.value as langtype);
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
