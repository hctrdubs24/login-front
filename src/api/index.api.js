import axios from "axios";

export const getUserList = async () =>
  await axios.get("http://localhost:1024/users");

export const createNewUser = async (user) => {
  // console.log(user);
  // await axios.post(`http://localhost:1024/create`, user);
  try {
    await axios.post(`http://localhost:1024/create`, user);
  } catch (error) {
    return "Error al crear el usuario";
  }
};

export const getDatosPersonales = async () =>
  await axios.get("http://localhost:1024/datos");

export const getUserToUpdate = async (_id) => {
  return await axios.get(`http://localhost:1024/update/${_id}`);
};

export const updateUserInfo = async (_id, userInfo) => {
  await axios.put(`http://localhost:1024/update/${_id}`, userInfo);
};

export const deleteUser = async (_id) => {
  await axios.delete(`http://localhost:1024/delete/${_id}`);
};

export const LoginAh = async (user) => {
  const { data } = await axios.post("http://localhost:1024/login", user);
  return data;
};

export const changePassword = async (userPass, _id) => {
  const data = await axios.put(
    `http://localhost:1024/password/${_id}`,
    userPass
  );
  return data;
};
