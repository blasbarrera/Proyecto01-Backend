const { createPedidoMongo, getPedidoMongo, updatePedidoMongo, deletePedidoMongo, getPedidoIdMongo } = require("./pedido.actions");

async function createPedido(id, datos) {
    const { idBooks } = datos;
    const pedidoCreado = await createPedidoMongo(id, idBooks);
    return pedidoCreado;
}

async function deletePedido(id, idUsuario) {
    const pedidoElim = await deletePedidoMongo(id, idUsuario);
    return pedidoElim;
}

async function updatePedido(datos, idUsuario) {
    const { _id, estado } = datos;
    const pedidoAct = await updatePedidoMongo(_id, estado, idUsuario);
    return pedidoAct;
}

async function readPedidoConFiltros(query, id) {
    const resultadosBusqueda = await getPedidoMongo(query, id);
    return resultadosBusqueda;
}

async function readPedidoPorId(id, idUsuario) {
    const pedido = await getPedidoIdMongo(id, idUsuario);
    return pedido;
}



module.exports = {
    createPedido,
    deletePedido,
    updatePedido,
    readPedidoConFiltros,
    readPedidoPorId
}