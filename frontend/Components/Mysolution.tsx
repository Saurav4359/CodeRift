interface prop {
  when: string;
  who: string;
  problem: string;
  lang: string;
  verdict: string;
  time: number;
  memory: number;
}
export function MySolutionBar({
  when,
  who,
  problem,
  lang,
  verdict,
  time,
  memory,
}: prop) {
  return (
    <>
      <div className="h-12  flex justify-center items-center gap-1 text-white/80 border-b border-white/40">
        <div className=" h-10 w-48 border-r border-white/40 flex justify-center items-center text-xl">
          {when}
        </div>
        <div className=" h-10 w-48 border-r border-white/40 flex justify-center items-center text-xl">
          {who}
        </div>
        <div className=" h-10 w-48 border-r border-white/40 flex justify-center items-center text-xl">
          {problem}
        </div>
        <div className=" h-10 w-48 border-r border-white/40 flex justify-center items-center text-xl">
          {lang}
        </div>
        <div className=" h-10 w-48 border-r border-white/40 flex justify-center items-center text-xl">
          {verdict}
        </div>
        <div className=" h-10 w-48 border-r border-white/40 flex justify-center items-center text-xl">
          {time}
        </div>
        <div className=" h-10 w-48   flex justify-center items-center text-xl">
          {memory}
        </div>
      </div>
    </>
  );
}
