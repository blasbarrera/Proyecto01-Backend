const express = require('express')
const router = express.Router();
const authenticateToken = require('../auth/autentication');
const { readLibroConFiltros, readLibroPorId, createLibro, updateLibro, deleteLibro } = require("./libro.controller");

async function GetLibros(req, res) {
    try {
        const resultadosBusqueda = await readLibroConFiltros(req.query);
        if (resultadosBusqueda.resultados.length === 0) {
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

async function GetLibro(req, res) {
    try {
        const libro = await readLibroPorId(req.params.id);
        res.status(200).json(libro)
    } catch(e) {
        res.status(500).json({msg: ""});
    }
}


async function PostLibro(req, res) {
    try {
        await createLibro(req.usuario._id, req.body);

        res.status(200).json({
            mensaje: "Exito."
        })
    } catch(e) {
        res.status(500).json({error: e});
    }
}

async function PatchLibros(req, res) {
    try {
        await updateLibro(req.body, req.usuario._id);
        res.status(200).json({
            mensaje: "Exito." 
        })
    } catch(e) {
        res.status(500).json({error: e});
    }
}


async function DeleteLibros(req, res) {
    try {
        await deleteLibro(req.params.id, req.usuario._id);
        res.status(200).json({
            mensaje: "Exito."
        })
    } catch(e) {
        res.status(500).json({error: e});
    }
}

router.get("/:id", GetLibro);
router.get("/", GetLibros);
router.post("/", authenticateToken, PostLibro);
router.patch("/", authenticateToken, PatchLibros);
router.delete("/:id", authenticateToken, DeleteLibros);


module.exports = router;