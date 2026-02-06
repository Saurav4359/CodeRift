interface probDetails {
  index: number;
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  tags: string[];
}

export function ProblemBar({ index, title, difficulty, tags }: probDetails) {
  return (
    <>
      <div className="h-12 w-350 bg-gray-400/20 rounded-2xl flex justify-evenly items-center gap-100 text-2xl ">
        <div>
          <div className=" h-8 w-110 flex justify-start items-center ">
            <span className="mr-1">{index + 1 + "."}</span>
            {title}
          </div>
        </div>
        <div className="flex justify-center items-center gap-10 ">
          <div className="  h-8 w-30 flex justify-center items-center ">
            <div
              className={
                difficulty === "EASY"
                  ? "text-green-400"
                  : difficulty === "MEDIUM"
                    ? "text-yellow-400"
                    : difficulty === "HARD"
                      ? "text-red-400"
                      : "text-white"
              }
            >
              {difficulty === "EASY"
                ? "Easy"
                : difficulty === "MEDIUM"
                  ? "Med."
                  : "Hard"}
            </div>
          </div>
          <div className=" h-8 w-60 flex justify-center items-center">
            {tags.map((value, index) => value + ",")}
          </div>
        </div>
      </div>
    </>
  );
}
