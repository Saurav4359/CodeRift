import "./App.css";
// import { CodeEditor } from "../pages/Editor";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Layout } from "../pages/Layout";
import { Section, Auth } from "../Components/section";
import { Problem } from "../Components/Allproblem";
import { Submission } from "../Components/Submission";
import { Contest } from "../pages/contest";
import { MySubmission } from "../Components/MySubmissions";
 
 
// import { useRef, useState } from "react";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Section />} />
            <Route path="/problems" element={<Problem />} />
            <Route path="/signup" element={<Auth />} />
            <Route path="/submission/:problemId" element={<Submission />} />
            <Route path="/mySubmissions" element={<MySubmission />} />
            <Route path="/contest" element={<Contest />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
