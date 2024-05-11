const Pedido = require("./pedido.model")
const Libro = require("../libro/libro.model")
const { getLibroIdMongo } = require("../libro/libro.actions");

async function createPedidoMongo(id, libros) {
    const primerLibro = await getLibroIdMongo(libros[0]);
    const idSeller = primerLibro.idUsuario;
    if (id.toString() === idSeller.toString()) {
        throw new Error("No se puede realizar un pedido a sí mismo.")
    }
    const librosBuscados = await Libro.find({_id: {$in : libros}});
    for (let i = 0; i < librosBuscados.length; i++) {
        if (librosBuscados[i].idUsuario.toString() !== librosBuscados[0].idUsuario.toString()) {
            throw new Error("No se puede realizar un pedido a un vendedor diferente.")
        }
    }
    
    const pedidoCreado = await Pedido.create({idBooks: libros, idBuyer: id, idSeller: idSeller});
    return pedidoCreado;
}

async function deletePedidoMongo(id, idUsuario) {
    const pedido = await Pedido.findOne({_id: id});
    if ((pedido.idSeller.toString() === idUsuario.toString() || pedido.idBuyer.toString() === idUsuario.toString()) && pedido.estado === "En proceso"){
        pedido.estado = "Cancelado";
        await pedido.save();
        return pedido;
    } else {
        throw new Error("El pedido no pudo ser eliminado.")
    }
}

async function updatePedidoMongo(id, estado, idUsuario) {
    const pedido = await Pedido.findOne({_id: id, estado: "En proceso."});
    if (!pedido) {
        throw new Error("El pedido no pudo ser modificado.")
    }
    if (pedido.idBuyer.toString() === idUsuario.toString() && estado === "Cancelado.") {
        pedido.estado = estado;
        await pedido.save();
        return pedido;
    } else if (pedido.idSeller.toString() === idUsuario.toString() && (estado === "Completado." || estado === "Cancelado")) {
        pedido.estado = estado;
        await pedido.save();
        if (estado === "Completado.") {
            const libros = await Libro.find({_id: {$in: pedido.idBooks}});
            for (let i = 0; i < libros.length; i++) {
                libros[i].borrado = Date.now();
                await libros[i].save();
            }
        }
        return pedido;
    } else {
        throw new Error("El pedido no pudo ser modificado.")
    }
}

async function getPedidoMongo(filtros, id) {
    const cantidadPedidosAsBuyer = await Pedido.countDocuments({...filtros, borrado: null, idBuyer: id});
    const pedidosFiltradosAsBuyer = await Pedido.find({...filtros, borrado: null, idBuyer: id});
    const cantidadPedidosAsSeller = await Pedido.countDocuments({...filtros, borrado: null, idSeller: id});
    const pedidosFiltradosAsSeller = await Pedido.find({...filtros, borrado: null, idSeller: id});

    return {
        pedidosBuyer: pedidosFiltradosAsBuyer,
        cPedidosBuyer: cantidadPedidosAsBuyer,
        pedidosSeller: pedidosFiltradosAsSeller,
        cPedidosSeller: cantidadPedidosAsSeller
    };
}

async function getPedidoIdMongo(id, idUsuario) {
    const pedido = await Pedido.findOne({_id: id, idBuyer: idUsuario});
    if (!pedido) {
        return await Pedido.findOne({_id: id, idSeller: idUsuario});
    }
    return pedido;
}

module.exports = {
    createPedidoMongo,
    deletePedidoMongo,
    updatePedidoMongo,
    getPedidoMongo,
    getPedidoIdMongo
}