import Editor from "@monaco-editor/react";
export function CodeEditor({ language }: { language: string }) {
  return (
    <Editor
      className="bg-black "
      height="600px"
      width="600px"
      defaultLanguage={language}
      defaultValue="// Some Path"
      theme="vs-dark" 
      options={{
        cursorBlinking:'blink',
        formatOnPaste: true,
        minimap: {
            enabled:false
        }
      }}
    />
  );
}
