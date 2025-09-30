import { deleteUser } from "../services/user.service.js";
import { handleSuccess } from "../Handlers/responseHandlers.js";
import { updateUser } from "../services/user.service.js";
export function getPublicProfile(req, res) {
  handleSuccess(res, 200, "Perfil público obtenido exitosamente", {
    message: "¡Hola! Este es un perfil público. Cualquiera puede verlo.",
  });
}

export function getPrivateProfile(req, res) {
  const user = req.user;

  handleSuccess(res, 200, "Perfil privado obtenido exitosamente", {
    message: `¡Hola, ${user.email}! Este es tu perfil privado. Solo tú puedes verlo.`,
    userData: user,
  });
}
export async function patchProfile(req, res) {
  const user = req.user;
  const email = user.gmail;
  const password = user.password;
  const id = user.id;
  try {
    const updatedUser = await updateUser(id, { email, password });
    res.status(200).json({ message: "Perfil actualizado", user: updatedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
export async function deleteProfile(req, res) {
  const id = req.user.id;
  if (!id) {
    return res.status(400).json({ error: "ID de usuario no encontrado en el token." });
  }
  try {
    await deleteUser(id);
    res.status(200).json({ message: "Perfil eliminado exitosamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}