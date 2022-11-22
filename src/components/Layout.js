import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { House, Tools, Gear, DoorOpen } from "react-bootstrap-icons";

export default function Layout({ children }) {
  const [localLoginStorage, setlocalLoginStorage] = useState("");
  const [idUserLogued, setIdUserLogued] = useState("");
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const localUnu = () => {
    setlocalLoginStorage(localStorage.getItem("login"));
    setIdUserLogued(localStorage.getItem("id"));
  };

  function handleLogout() {
    localStorage.removeItem("login");
    localStorage.removeItem("id");
    localStorage.removeItem("password");
    navigate("/login");
  }

  useEffect(() => {
    localUnu();
  }, [localLoginStorage, localUnu]);

  if (localLoginStorage !== null) {
    return (
      <>
        <nav>
          <div>
            <Link to="/">
              <House /> Inicio
            </Link>
          </div>
          <div>
            <Link to={`/password/${idUserLogued}`}>
              <Gear /> Cambio de contraseña
            </Link>
          </div>

          <div>
            <Link to="/users">
              {" "}
              <Tools /> Mantenimiento de usuarios
            </Link>
          </div>

          <div>
            <Link className="logout" to="/login" onClick={handleLogout}>
              <DoorOpen/>
              Cerrar sesión
            </Link>
          </div>
        </nav>

        <main className="container">{children}</main>
      </>
    );
  } else {
    return (
      <>
        <main className="container">{children}</main>
      </>
    );
  }

  // return (

  // );
}
