const { createUsuarioMongo, loginUsuarioMongo, getUsuarioIdMongo, updateUsuarioMongo, deleteUsuarioMongo } = require("./usuario.actions");
const bcrypt = require("bcrypt");

async function createUsuario(datos) {
    const { nombre, apellido, usuario, pwd } = datos;
    const salt = await bcrypt.genSaltSync();
    const hash = await bcrypt.hash(pwd, salt);
    const usuarioCreado = await createUsuarioMongo(nombre, apellido, usuario, hash);
    return usuarioCreado;
}

async function readUsuarioPorId(id) {
    const usuario = await getUsuarioIdMongo(id);
    return usuario;
}

async function updateUsuario(datos, idUsuario) {
    const usuarioActualizado = await updateUsuarioMongo(datos, idUsuario);
    return usuarioActualizado;
}

async function deleteUsuario(id) {
    const usuarioEliminado = await deleteUsuarioMongo(id);
    return usuarioEliminado;
}

async function loginUsuario(datos) {
    const { usuario, pwd } = datos;
    const usuarioEncontrado = await loginUsuarioMongo(usuario);
    if (await bcrypt.compare(pwd, usuarioEncontrado.pwd)) {
        return usuarioEncontrado;
    } else {
        throw new Error("Usuario o contraseña incorrectos");
    }
}



module.exports = {
    createUsuario,
    readUsuarioPorId,
    updateUsuario,
    deleteUsuario,
    loginUsuario
};