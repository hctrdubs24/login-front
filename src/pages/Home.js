import { useEffect, useState } from "react";

function Home() {
  const [LoginLocalStorage, setLoginLocalStorage] = useState("");

  useEffect(() => {
    setLoginLocalStorage(localStorage.getItem("login"));
  }, []);

  return (
    <div>
      {/* <p> {localStorage.getItem("id")}</p> */}
      {/* <p> {localStorage.getItem("password")}</p> */}
      <h1> Bienvenido {LoginLocalStorage}</h1>
    </div>
  );
}

export default Home;
