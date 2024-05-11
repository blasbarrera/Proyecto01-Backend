const Libro = require("./libro.model")

async function createLibroMongo(id, datos) {
    const libroCreado = await Libro.create({...datos, idUsuario: id});
    return libroCreado;
}

async function deleteLibroMongo(id, idUsuario) {
    const update = { borrado: Date.now() };
    const resultado = await Libro.findOneAndUpdate({_id : id, borrado: null, idUsuario: idUsuario}, update, {new: true,});
    if (!resultado) {
        throw new Error("El libro no pudo ser eliminado.")
    }
    return resultado;
}

async function updateLibroMongo(id, cambios, idUsuario) {
    const resultado = await Libro.findOneAndUpdate({_id: id, borrado: null, idUsuario: idUsuario}, cambios, {new: true});
    if (!resultado) {
        throw new Error("El libro no pudo ser modificado.")
    }
    return resultado
}

async function getLibroMongo(filtros) {
    const cantidadLibros = await Libro.countDocuments({...filtros, borrado: null});
    const librosFiltrados = await Libro.find({...filtros, borrado: null});

    return {
        resultados: librosFiltrados,
        cantidadLibros: cantidadLibros
    };
}

async function getLibroIdMongo(id) {
    const libro = await Libro.findOne({_id: id});
    return libro;

}

module.exports = {
    createLibroMongo,
    deleteLibroMongo,
    updateLibroMongo,
    getLibroIdMongo,
    getLibroMongo
};