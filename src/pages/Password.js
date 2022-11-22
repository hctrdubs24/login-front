import { useState, useEffect } from "react";
import { changePassword } from "../api/index.api";
import { Eye, EyeSlash, Save } from "react-bootstrap-icons";

function Password() {
  const [localLoginStorage, setlocalLoginStorage] = useState("");
  const [localUserPassword, setLocalUserPassword] = useState("");
  const [viewPassword, setViewPassword] = useState("Eye");
  const [viewPassword1, setViewPassword1] = useState("Eye");
  const [viewPassword2, setViewPassword2] = useState("Eye");

  const [message, setMessage] = useState("");
  const [typeMessage, setTypeMessage] = useState("");
  const [idUserLogued, setIdUserLogued] = useState("");
  const [inputs, setInputs] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  let { oldPassword, newPassword, confirmNewPassword } = inputs;

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const localUnu = () => {
    setlocalLoginStorage(localStorage.getItem("login"));
    setIdUserLogued(localStorage.getItem("id"));
    setLocalUserPassword(localStorage.getItem("password"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userPassword = {
      oldPassword,
      newPassword,
      confirmNewPassword,
    };
    const response = await changePassword(userPassword, idUserLogued);
    if (response.data.result) {
      setMessage(response.data.message);
      setTypeMessage("success");
      const password = document.querySelector("#password"),
        password1 = document.querySelector("#password1"),
        password2 = document.querySelector("#password2");
      password.value = "";
      password1.value = "";
      password2.value = "";

      setTimeout(() => {
        setMessage("");
      }, 2000);
    } else {
      setMessage(response.data.message);
      setTypeMessage("error");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };

  const handleEye = () => {
    if (viewPassword === "Eye") setViewPassword("EyeNo");
    if (viewPassword === "EyeNo") setViewPassword("Eye");
    const password = document.querySelector("#password"),
      type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
  };

  const handleEye1 = () => {
    if (viewPassword1 === "Eye") setViewPassword1("EyeNo");
    if (viewPassword1 === "EyeNo") setViewPassword1("Eye");
    const password = document.querySelector("#password1"),
      type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
  };

  const handleEye2 = () => {
    if (viewPassword2 === "Eye") setViewPassword2("EyeNo");
    if (viewPassword2 === "EyeNo") setViewPassword2("Eye");
    const password = document.querySelector("#password2"),
      type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
  };

  useEffect(() => {
    localUnu();
  }, [localLoginStorage, localUnu]);

  return (
    <>
      <div className="login">
        <h1>Cambio de contraseña:</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>
            Contraseña actual
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <input
                type="password"
                name="oldPassword"
                placeholder="Contraseña actual"
                autoComplete="off"
                autoFocus
                id="password"
                onChange={(e) => handleChange(e)}
                style={{ width: "100%" }}
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
          </label>
          <label>
            Nueva contraseña
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <input
                type="password"
                name="newPassword"
                placeholder="Nueva contraseña"
                autoComplete="off"
                autoFocus
                id="password1"
                onChange={(e) => handleChange(e)}
                style={{ width: "100%" }}
              />
              <label
                onClick={() => handleEye1()}
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
          </label>
          <label>
            Confirmación de la nueva contraseña
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <input
                type="password"
                name="confirmNewPassword"
                placeholder="Confirmar nueva contraseña"
                autoComplete="off"
                autoFocus
                id="password2"
                onChange={(e) => handleChange(e)}
                style={{ width: "100%" }}
              />
              <label
                onClick={() => handleEye2()}
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
          </label>
          <input type="hidden" name="userPass" value="<%= name %>" />
          <button className="btn-success"> <Save/> Actualizar</button>
        </form>
        {message && <p className={typeMessage}>{message}</p>}
      </div>
    </>
  );
}

export default Password;
