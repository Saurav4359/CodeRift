import Editor from "@monaco-editor/react";
export function CodeEditor({ language }: { language: string }) {
  const path = {
    javascript: "// write javascript",
    java: "// write java code",
    cpp: "// C++ code",
  };
  return (
    <Editor
      key={language}
      className="bg-black border-white/40 border-2 rounded-b"
      height="620px"
      width="600px"
      defaultLanguage={language}
      defaultValue={path[language as keyof typeof path]}
      theme="vs-dark"
      options={{
        cursorBlinking: "blink",
        formatOnPaste: true,
        minimap: {
          enabled: false,
        },
      }}
    />
  );
}
