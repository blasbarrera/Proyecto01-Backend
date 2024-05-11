const Usuario = require("./usuario.model")

async function createUsuarioMongo(nombre, apellido, usuario, pwd) {
    const usuarioCreado = await Usuario.create({nombre: nombre, apellido: apellido, usuario: usuario, pwd: pwd});
    return usuarioCreado;
}

async function loginUsuarioMongo(usuario) {
    const usuarioEncontrado = await Usuario.findOne({usuario: usuario, borrado: null});
    return usuarioEncontrado;
}

async function getUsuarioIdMongo(id) {
    const usuario = await Usuario.findOne({_id: id});
    return {nombre: usuario.nombre, apellido: usuario.apellido, usuario: usuario.usuario, _id: usuario._id};
}

async function updateUsuarioMongo(cambios, idUsuario) {
    const resultado = await Usuario.findOneAndUpdate({_id: idUsuario, borrado: null}, cambios, {new: true});
    if (!resultado) {
        throw new Error("Usuario no encontrado");
    }
    return resultado
}

async function deleteUsuarioMongo(id) {
    const update = { borrado: Date.now() };
    const resultado = await Usuario.findOneAndUpdate({_id : id, borrado: null}, update, {new: true});
    if (!resultado) {
        throw new Error("Usuario no encontrado");
    }
    return resultado;

}

module.exports = {
    createUsuarioMongo,
    loginUsuarioMongo,
    getUsuarioIdMongo,
    updateUsuarioMongo,
    deleteUsuarioMongo
};