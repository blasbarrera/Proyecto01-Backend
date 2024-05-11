const { createLibroMongo, getLibroMongo, updateLibroMongo, deleteLibroMongo, getLibroIdMongo } = require("./libro.actions");

async function createLibro(id, datos) {
    const libroCreado = await createLibroMongo(id, datos);
    return libroCreado;
}

async function deleteLibro(id, idUsuario) {
    const libroEliminado = await deleteLibroMongo(id, idUsuario);
    return libroEliminado;
}

async function updateLibro(datos, idUsuario) {
    const { _id, ...cambios } = datos;
    const libroActualizado = await updateLibroMongo(_id, cambios, idUsuario);
    return libroActualizado;
}

async function readLibroConFiltros(query) {
    const resultadosBusqueda = await getLibroMongo(query);
    return resultadosBusqueda;
}

async function readLibroPorId(id) {
    const libro = await getLibroIdMongo(id);
    return libro;
}

module.exports = {
    createLibro,
    deleteLibro,
    updateLibro,
    readLibroConFiltros,
    readLibroPorId
    
}