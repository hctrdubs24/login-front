import { Link } from "react-router-dom";
import { deleteUser } from "../api/index.api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UserRow({ user }) {
  const [dateStart, setDateStart] = useState("");
  const [dateEnds, setDateEnds] = useState("");

  const navigate = useNavigate();
  const handleDelete = async (e, _id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`¿Está seguro de eliminar el registro con el ID: ${_id}?`)) {
      await deleteUser(_id);
      navigate(0);
    }
  };

  useEffect(() => {
    setDateStart(String(user.DateStarts).substring(0, 10));
    setDateEnds(String(user.DateEnds).substring(0, 10));
  }, [user.DateEnds, user.DateStarts]);

  return (
    <>
      <tr>
        <td>{user._id}</td>
        {/* <td>{user.Login}</td> */}
        <td>{user.Login}</td>
        {/* <td>{user.DateStarts}</td> */}
        <td>{dateStart}</td>
        {/* <td>{user.DateEnds}</td> */}
        <td>{dateEnds}</td>
        <td>{user.StateAcount === "on" ? "Activo" : "Inactivo"}</td>
        <td>
          <Link to={`/edit/${user._id}`} className="btn-edit">
            Editar
          </Link>
        </td>
        <td id="td">
          <Link
            // data-userDelete={user._id}
            onClick={(e) => handleDelete(e, user._id)}
            className="btn-danger btn-delete"
          >
            Eliminar
          </Link>
        </td>
      </tr>
    </>
  );
}
