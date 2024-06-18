import React from "react";
import "./App.css";

import Registration from "./pages/Registration/index";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Catalogue from "./pages/Catalogue";

import YourQuizes from "./pages/YourQuizes";
import EditQuiz from "./pages/EditQuiz";
import CreateQuiz from "./pages/CreateQuiz";
import { Route, Routes } from "react-router-dom";

import RequireAuth from "./components/RequireAuth/RequireAuth";
import PersistLogin from "./components/PersistLogin/PersistLogin";
import Quiz from "./pages/Quiz";
import useAuth from "./hooks/useAuth";

import useGetMe from "./hooks/useGetMe";

function App() {
  const { auth } = useAuth();
  const getMe = useGetMe();

  React.useEffect(() => {
    if (auth?.token) {
      getMe();
    }

    return;
  }, [auth?.token]);

  return (
    <>
      <Routes>
        <Route path="/" element={<PersistLogin />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route element={<RequireAuth />}>
            <Route path="/createQuiz" element={<CreateQuiz />} />
            <Route path="/yourQuizes" element={<YourQuizes />} />
            <Route path="/editQuiz/:quizId" element={<EditQuiz />} />

            <Route path="/catalogue/:quizId" element={<Quiz />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
