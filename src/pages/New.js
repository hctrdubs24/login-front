import { useState, useEffect } from "react";
import { createNewUser, getDatosPersonales } from "../api/index.api";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeSlash, Save, XCircle } from "react-bootstrap-icons";

export default function New() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [typeMessage, setTypeMessage] = useState("error");
  const [checked, setChecked] = useState("on");
  const [datosPersonales, setDatosPersonales] = useState([]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Login !== "" && Password !== "" && CvPerso !== "") {
      let today = new Date(),
        dd = String(today.getDate()).padStart(2, "0"),
        mm = String(today.getMonth() + 1).padStart(2, "0"),
        yyyy = today.getFullYear();
      if (DateStarts === "") {
        DateStarts = new Date(`${yyyy}-${mm}-${dd}`);
      }
      if (DateEnds === "") {
        DateEnds = new Date(`${yyyy}-${mm}-${Number(dd) + 5}`);
      }
      const user = {
        CvPerso,
        Login,
        Password,
        DateStarts: DateStarts,
        DateEnds: DateEnds,
        StateAcount: checked,
      };
      // console.log(user);
      // await createNewUser(user);
      const response = await createNewUser(user);
      console.log(response, "response");

      if (response === undefined) {
        setMessage("Usuario creado correctamente");
        setTypeMessage("success");
        setTimeout(() => {
          setMessage("");
          navigate("/users");
        }, 2000);
      } else {
        setMessage(response);
        setTypeMessage("error");
        setTimeout(() => {
          setMessage("");
        }, 2000);
      }
    } else {
      setMessage("Por favor llene todos los campos");
      setTypeMessage("error");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };

  const handleChecked = () => {
    if (checked === "on") {
      setChecked("");
    } else if (checked === "") {
      setChecked("on");
    }
    console.log(checked);
  };

  const loadDateForm = () => {
    let today = new Date(),
      dd = String(today.getDate()).padStart(2, "0"),
      mm = String(today.getMonth() + 1).padStart(2, "0"),
      yyyy = today.getFullYear();

    document.getElementById("dateIni").defaultValue = `${yyyy}-${mm}-${dd}`;
    document.getElementById("dateFin").defaultValue = `${yyyy}-${mm}-${
      Number(dd) + 5
    }`;
  };

  const loadDatosPersonales = async () => {
    const { data } = await getDatosPersonales();
    setDatosPersonales(data);
  };

  useEffect(() => {
    loadDateForm();
    loadDatosPersonales();
  }, []);

  return (
    <>
      <div className="login">
        <h3>Nuevo usuario</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>
            CvPersona
            <select name="CvPerso" onChange={(e) => handleChange(e)}>
              <option value="">Seleccione un c??digo de persona</option>
              {datosPersonales.map((dato) => (
                <option value={dato._id} key={dato._id}>
                  {dato.Nombre} - {dato.TipoPerso}
                </option>
              ))}
            </select>
          </label>
          <label>
            Login del usuario
            <input
              type="text"
              name="Login"
              autoComplete="off"
              placeholder="Ingrese el login del usuario"
              onChange={(e) => handleChange(e)}
            />
          </label>
          <label>
            Contrase??a
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
                placeholder="Ingrese la contrase??a"
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
              onChange={(e) => handleChange(e)}
            />
          </label>
          <label>
            Fecha de termino
            <input
              type="date"
              name="DateEnds"
              id="dateFin"
              onChange={(e) => handleChange(e)}
            />
          </label>
          <label>
            Estado de la cuenta
            <input
              type="checkbox"
              name="StateAcount"
              checked={checked === "on" ? "on" : ""}
              onChange={(e) => {
                handleChange(e);
                handleChecked();
              }}
            />
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
          >
            <XCircle />
            Cancelar
          </Link>
        </div>
        {message && <p className={typeMessage}>{message}</p>}
      </div>
    </>
  );
}
