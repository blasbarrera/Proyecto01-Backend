
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const uri = process.env.DB_URI
const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req,res) => {
    res.status(200).json({});
})

const rutasUsuario = require("./usuario/usuario.route")
app.use('/usuario', rutasUsuario);
const rutasLibro = require("./libro/libro.route")
app.use('/libro', rutasLibro);
const rutasPedido = require("./pedido/pedido.route")
app.use('/pedido', rutasPedido)


// aqui va la connection string VVVVV
mongoose.connect(uri).then(() => {
    console.log("CONNECTED")
    app.listen(8080);
}).catch((err) =>{
    console.log("ERROR")
    console.log(err)
})

