// import { useState, useEffect } from "react";
// import {
//   createNewUser,
//   getDatosPersonales,
//   getUserToUpdate,
// } from "../api/index.api";

// var response = [];

// export default function Edit() {
//   const [message, setMessage] = useState("");
//   const [typeMessage, setTypeMessage] = useState("error");
//   const [checked, setChecked] = useState("on");
//   const [datosPersonales, setDatosPersonales] = useState([]);
//   const [userInfo, setUserInfo] = useState(null);
//   const [inputs, setInputs] = useState({
//     CvPerso: 1,
//     Login: "",
//     Password: "",
//     DateStarts: "",
//     DateEnds: "",
//     StateAcount: "",
//   });

//   let { CvPerso, Login, Password, DateStarts, DateEnds, StateAcount } = inputs;

//   const handleChange = (e) => {
//     setInputs({ ...inputs, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (Login !== "" && Password !== "" && CvPerso !== "") {
//       let today = new Date(),
//         dd = String(today.getDate()).padStart(2, "0"),
//         mm = String(today.getMonth() + 1).padStart(2, "0"),
//         yyyy = today.getFullYear();
//       if (DateStarts === "") {
//         DateStarts = new Date(`${yyyy}-${mm}-${dd}`);
//       }
//       if (DateEnds === "") {
//         DateEnds = new Date(`${yyyy}-${mm}-${Number(dd) + 5}`);
//       }
//       const user = {
//         CvPerso,
//         Login,
//         Password,
//         DateStarts: DateStarts,
//         DateEnds: DateEnds,
//         StateAcount: checked,
//       };
//       console.log(user);
//       await createNewUser(user);

//       setMessage("Usuario actualizado correctamente");
//       setTypeMessage("success");
//       setTimeout(() => {
//         setMessage("");
//       }, 2000);
//     } else {
//       setMessage("Por favor llene todos los campos");
//       setTypeMessage("error");
//       setTimeout(() => {
//         setMessage("");
//       }, 2000);
//     }
//   };

//   const handleChecked = () => {
//     if (checked === "on") {
//       setChecked("");
//     } else if (checked === "") {
//       setChecked("on");
//     }
//     console.log(checked);
//   };

//   //   async function loadUserToUpdateInfo() {
//   //     var response = await getUserToUpdate("6379916fcc4b457e8d8da5d7");
//   // console.log(response.data)
//   //     setDatosPersonales(response.data);

//   //     console.log(datosPersonales);
//   //   }

//   const loadDateForm = () => {
//     let today = new Date(),
//       dd = String(today.getDate()).padStart(2, "0"),
//       mm = String(today.getMonth() + 1).padStart(2, "0"),
//       yyyy = today.getFullYear();

//     document.getElementById("dateIni").defaultValue = `${yyyy}-${mm}-${dd}`;
//     document.getElementById("dateFin").defaultValue = `${yyyy}-${mm}-${
//       Number(dd) + 5
//     }`;
//   };

//   const loadDatosPersonales = async () => {
//     const { data } = await getDatosPersonales();
//     setDatosPersonales(data);
//   };

//   async function loadUserToUpdateInfo() {
//     response = await getUserToUpdate("6379916fcc4b457e8d8da5d7");
//     console.log(response.data);
//     setDatosPersonales(response.data);
//     console.log(datosPersonales);
//   }

//   useEffect(() => {
//     loadDateForm();

//     loadUserToUpdateInfo();
//   }, [datosPersonales, loadUserToUpdateInfo]);

//   return (
//     <>
//       <div className="login">
//         <h3>Editar usuario</h3>
//         <form onSubmit={(e) => handleSubmit(e)}>
//           <label>
//             CvPersona
//             <select name="CvPerso" onChange={(e) => handleChange(e)}>
//               <option value="">Seleccione un código de persona</option>
//             </select>
//           </label>
//           <label>
//             Login del usuario
//             <input
//               type="text"
//               name="Login"
//               autoComplete="off"
//               placeholder="Ingrese el login del usuario"
//               onChange={(e) => handleChange(e)}
//             />
//           </label>
//           <label>
//             Contraseña
//             <input
//               type="password"
//               name="Password"
//               id="password"
//               autoComplete="off"
//               placeholder="Ingrese la contraseña"
//               onChange={(e) => handleChange(e)}
//             />
//           </label>
//           <label>
//             Fecha de inicio
//             <input
//               type="date"
//               name="DateStarts"
//               id="dateIni"
//               onChange={(e) => handleChange(e)}
//             />
//           </label>
//           <label>
//             Fecha de termino
//             <input
//               type="date"
//               name="DateEnds"
//               id="dateFin"
//               onChange={(e) => handleChange(e)}
//             />
//           </label>
//           <label>
//             Estado de la cuenta
//             <input
//               type="checkbox"
//               name="StateAcount"
//               checked={checked === "on" ? "on" : ""}
//               onChange={(e) => {
//                 handleChange(e);
//                 handleChecked();
//               }}
//             />
//           </label>
//           <button className="btn-success">Guardar</button>
//         </form>
//         <div style={{ marginTop: "5px", width: "100%", height: "40px" }}>
//           <a
//             href="/users"
//             className="btn-danger"
//             style={{
//               width: "88%",
//               fontSize: "13px",
//               height: "16px",
//               textAlign: "center",
//             }}
//             id="cancelUsers"
//           >
//             Cancelar
//           </a>
//         </div>
//         {message && <p className={typeMessage}>{message}</p>}
//       </div>
//     </>
//   );
// }
