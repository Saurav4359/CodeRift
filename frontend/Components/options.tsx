export function Option() {
  return (
    <>
      <select
        name=""
        id=""
        className="w-22 h-8 focus:outline-black border-black border hover:cursor-pointer rounded-xl"
      >
        <option value="Java">Java</option>
        <option value="Cpp">C++</option>
        <option value="Python">Python</option>
        <option value="C">C</option>
      </select>
    </>
  );
}
