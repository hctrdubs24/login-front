import Layout from "./components/Layout";
import New from "./pages/New";
import Test from "./pages/test";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Password from "./pages/Password";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
  const [idUserLogued, setIdUserLogued] = useState("");
  const navigate = useNavigate();
  const local = () => {
    const local = localStorage.getItem("login");
    setIdUserLogued(localStorage.getItem("id"));
    if (local === null || local === "") {
      navigate("/login");
    }
  };

  useEffect(() => {
    local();
  }, []);

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={`/password/:_id`} element={<Password />} />
          <Route path="/users" element={<Users />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit/:_id" element={<Test />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
