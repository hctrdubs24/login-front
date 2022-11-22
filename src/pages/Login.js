import { useState } from "react";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { LoginAh } from "../api/index.api";

function Login() {
  const [inputs, setInputs] = useState({
    Login: "",
    Password: "",
  });
  const [viewPassword, setViewPassword] = useState("Eye");
  const [message, setMessage] = useState("");
  const [typeMessage, setTypeMessage] = useState("");
  const { Login, Password } = inputs;

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Login !== "" || Password !== "") {
      const UserLogin = {
        Login,
        Password,
      };
      const response = await LoginAh(UserLogin);
      console.log(response);
      if (response.message === "Logueo correcto") {
        setMessage(response.message);
        setTypeMessage("success");
        localStorage.setItem("id", response.usuario._id);
        localStorage.setItem("login", response.usuario.Login);
        localStorage.setItem("password", response.usuario.Password);

        setTimeout(() => {
          setMessage("");
          navigate("/");
        }, 1000);
      } else {
        setMessage(response.message);
        setTypeMessage("error");
        setTimeout(() => {
          setMessage("");
        }, 2000);
      }
    }
  };

  const handleEye = () => {
    if (viewPassword === "Eye") setViewPassword("EyeNo");
    if (viewPassword === "EyeNo") setViewPassword("Eye");
    console.log(viewPassword);
    const password = document.querySelector("#password");
    const type =
      password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
  };

  return (
    <>
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>
            Usuario
            <input
              type="text"
              name="Login"
              placeholder="Usuario"
              autoFocus
              required
              autoComplete="off"
              onChange={(e) => handleChange(e)}
            />
          </label>
          <label>
            Contraseña
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <input
                type="password"
                name="Password"
                id="password"
                autoComplete="off"
                placeholder="Contraseña"
                onChange={(e) => handleChange(e)}
                style={{ width: "100%" }}
                required
              />
              <label
                onClick={() => handleEye()}
                style={{
                  display: "block",
                  cursor: "pointer",
                  marginTop: "13px",
                  position: "fixed",
                  marginLeft: "275px",
                }}
              >
                {viewPassword === "Eye" ? <Eye /> : <EyeSlash />}
              </label>
            </div>
            <i className="bi bi-eye-slash" id="togglePassword"></i>
          </label>
          <input type="submit" className="btn-success" value="Ingresar" />
        </form>
        {message && <p className={typeMessage}>{message}</p>}
      </div>
    </>
  );
}

export default Login;
