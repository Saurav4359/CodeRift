import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "../pages/Layout";
import { Section, LoginPage, SignupPage } from "../Components/section";
import { Problem } from "../Components/Allproblem";
import { Submission } from "../Components/Submission";
import { Contest } from "../pages/contest";
import { MySubmission } from "../Components/MySubmissions";
import { AddProblem } from "../pages/AddProblem";
import { AddTestCases } from "../pages/AddTestCases";

import { ProtectedRoute } from "../Components/ProtectedRoute";
import { UserProvider } from "../Components/UserProvider";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Section />} />
            <Route element={<UserProvider />}>
              <Route element={<ProtectedRoute />}>
                <Route path="/problems" element={<Problem />} />
                <Route path="/submission/:problemId" element={<Submission />} />
                <Route path="/mySubmissions" element={<MySubmission />} />
                <Route path="/addProblem/" element={<AddProblem />} />

                <Route
                  path="/addTestcases/:newProblemId"
                  element={<AddTestCases />}
                />
                <Route path="/contest" element={<Contest />} />
              </Route>
              <Route path="/login" element={<LoginPage />} />
            </Route>

            <Route path="/signup" element={<SignupPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;


 