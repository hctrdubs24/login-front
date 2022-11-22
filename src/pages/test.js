import { useEffect, useState } from "react";
import { getUserToUpdate, updateUserInfo } from "../api/index.api";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Eye, EyeSlash, Save, XCircle } from "react-bootstrap-icons";

export default function Test() {
  const params = useParams();
  const navigate = useNavigate();
  const [dateStarts, setDateStarts] = useState("");
  const [dateEnds, setDateEnds] = useState("");
  const [userToUpdate, setUserToUpdate] = useState([]);
  const [message, setMessage] = useState("");
  const [typeMessage, setTypeMessage] = useState("error");
  const [checked, setChecked] = useState("");
  const [viewPassword, setViewPassword] = useState("Eye");
  const [inputs, setInputs] = useState({
    CvPerso: 1,
    Login: "",
    Password: "",
    DateStarts: "",
    DateEnds: "",
    StateAcount: "",
  });

  let { CvPerso, Login, Password, DateStarts, DateEnds, StateAcount } = inputs;

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
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

  const handleChecked = (e) => {
    console.log(e);
    if (e.target.checked === false) {
      setChecked("");
    }
    if (e.target.checked === true) {
      setChecked("on");
    }
    console.log(checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Login !== "" && Password !== "" && CvPerso !== "") {
      const userInfor = {
        CvPerso,
        Login,
        Password,
        DateStarts: DateStarts,
        DateEnds: DateEnds,
        StateAcount: checked,
      };
      console.log(userInfor);
      await updateUserInfo(userToUpdate._id, userInfor);
      setMessage("Usuario actualizado correctamente");
      setTypeMessage("success");
      setTimeout(() => {
        setMessage("");
        navigate("/users");
      }, 2000);
    } else {
      setMessage("Por favor llene todos los campos");
      setTypeMessage("error");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };

  const handleChangeDateStarts = (e) => {
    console.log(e.target.value);
  };

  async function loadUserInfo() {
    const { data } = await getUserToUpdate(params._id);
    setUserToUpdate(data);
    setInputs({
      CvPerso: data.CvPerso,
      Login: data.Login,
      Password: data.Password,
      DateStarts: data.DateStarts,
      DateEnds: data.DateEnds,
      StateAcount: data.StateAcount,
    });
    setChecked(String(data.StateAcount));
    setDateStarts(String(data.DateStarts).substring(0, 10));
    setDateEnds(String(data.DateEnds).substring(0, 10));
  }

  useEffect(() => {
    loadUserInfo();
  }, []);

  return (
    <>
      <div className="login">
        <h3>Actualizar usuario</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
          {/* <label>
            CvPersona
            <select name="CvPerso" onChange={(e) => handleChange(e)}>
              <option
                defaultValue={userToUpdate._id}
              >{`${userToUpdate.Login}`}</option>
            </select>
          </label> */}
          <input type="hidden" name="CvPerso" defaultValue={userToUpdate._id} />
          <label>
            Login del usuario
            <input
              type="text"
              name="Login"
              autoComplete="off"
              placeholder="Ingrese el login del usuario"
              defaultValue={userToUpdate.Login}
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
                defaultValue={userToUpdate.Password}
                autoComplete="off"
                placeholder="Ingrese la contraseña"
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
            Fecha de inicio
            <input
              type="date"
              name="DateStarts"
              id="dateIni"
              defaultValue={dateStarts}
              onChange={(e) => {
                handleChange(e);
                handleChangeDateStarts(e);
              }}
            />
          </label>
          <label>
            Fecha de termino
            <input
              type="date"
              name="DateEnds"
              id="dateFin"
              defaultValue={dateEnds}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </label>
          <label>
            Estado de la cuenta
            {checked === "on" ? (
              <input
                type="checkbox"
                name="StateAcount"
                // defaultChecked
                checked
                onChange={(e) => {
                  handleChecked(e);
                  handleChange(e);
                }}
              />
            ) : (
              <input
                type="checkbox"
                name="StateAcount"
                onChange={(e) => {
                  handleChecked(e);
                  handleChange(e);
                }}
              />
            )}
          </label>
          <button className="btn-success">
            <Save /> Guardar
          </button>
        </form>
        <div style={{ marginTop: "5px", width: "100%", height: "40px" }}>
          <Link
            to="/users"
            className="btn-danger"
            style={{
              width: "88%",
              fontSize: "13px",
              height: "16px",
              textAlign: "center",
            }}
            id="cancelUsers"
          ><XCircle />
            Cancelar
          </Link>
        </div>
        {message && <p className={typeMessage}>{message}</p>}
      </div>
    </>
  );
}
