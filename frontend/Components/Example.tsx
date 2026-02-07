export function Example({ input,output}: { input :string, output: string}) {
 
          
    return <>
    <div className="bg-red-800 w-195 min-h mt-2 hover:bg-gray-500 grid gap-1">
        Example:  
        <div className="min-h bg-pink-400 whitespace-pre-line">Input : <div>{input}</div></div>
        <div className="min-h bg-pink-400 whitespace-pre-line">Output : <div>{output}</div> </div>
    </div>
    </>
}