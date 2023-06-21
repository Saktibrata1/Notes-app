import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import SignIn from "./components/SignIn";
import Notes from "./components/Notes";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Signup />} exact />
            <Route path="/SignIn" element={<SignIn />} exact />
            <Route path="/login" element={<SignIn />} exact />
            <Route path="/signup" element={<Signup />} exact />
            <Route path="/notes" element={<Notes />} exact />

          </Routes>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
