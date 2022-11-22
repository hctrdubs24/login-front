import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getUserList } from "../api/index.api";
import UserRow from "../components/UserRow";

export default function Users() {
  const [users, setUsers] = useState([]);

  async function loadUsers() {
    const response = await getUserList();
    setUsers(response.data);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <>
      <div>
        <h1>Usuarios</h1>
        <Link className="btn-edit" to="/new">
          Nuevo usuario
        </Link>
        <div className="table-box" style={{ transition: "300ms all " }}>
          <table>
            <thead>
              <tr>
                <td>ID</td>
                {/* <td>Nombre</td> */}
                <td>Login</td>
                <td>Fecha de inicio</td>
                <td>Fecha de fin</td>
                <td>Estado</td>
                <td colSpan={2}>Acciones</td>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <UserRow user={user} key={`${user.CvPerso}${user.Login}`} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
