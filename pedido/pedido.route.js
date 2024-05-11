const express = require('express')
const router = express.Router();
const authenticateToken = require('../auth/autentication');

const { readPedidoConFiltros, readPedidoPorId, createPedido, updatePedido, deletePedido } = require("./pedido.controller");

async function GetPedidos(req, res) {
    try {
        const resultadosBusqueda = await readPedidoConFiltros(req.query, req.usuario._id);
        if (resultadosBusqueda.cPedidosBuyer === 0 && resultadosBusqueda.cPedidosSeller === 0) {
            res.status(404).json({
                mensaje: "No se encontraron resultados."
            })
        } else{
            res.status(200).json({
                ...resultadosBusqueda
            })
        }
    } catch(e) {
        res.status(500).json({msg: ""});
    }
}

async function GetPedido(req, res) {
    try {
        const pedido = await readPedidoPorId(req.params.id, req.usuario._id);
        res.status(200).json(pedido)
    } catch(e) {
        res.status(500).json({msg: ""});
    }
}

async function PostPedido(req, res) {
    try {
        const pedido = await createPedido(req.usuario._id, req.body);
        res.status(200).json(pedido)
    } catch(e) {
        res.status(500).json({error: e});
    }
}

async function PatchPedidos(req, res) {
    try {
        const pedidoAct = await updatePedido(req.body, req.usuario._id);
        res.status(200).json(pedidoAct)
    } catch(e) {
        res.status(500).json({error: e});
    }
}

async function DeletePedidos(req, res) {
    try {
        await deletePedido(req.params.id, req.usuario._id);
        res.status(200).json({
            mensaje: "Exito. 👍"
        })
    } catch(e) {
        res.status(500).json({error: e});
    }
}

router.get("/:id", authenticateToken, GetPedido);
router.get("/", authenticateToken, GetPedidos);
router.post("/", authenticateToken, PostPedido);
router.patch("/", authenticateToken, PatchPedidos);
router.delete("/:id", authenticateToken, DeletePedidos);

module.exports = router;