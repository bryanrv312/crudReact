//referenciar a express que es el framework de node para realizar peticiones

const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "empleadoscrudreactdb"
});

//peticion para guardar
app.post("/create", (req, res) => {
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    db.query('INSERT INTO empleados (nombre,edad,pais,cargo,anios) values(?,?,?,?,?)', [nombre, edad, pais, cargo, anios],
        (err, result) => {
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    );
});


//peticion para Listar
app.get("/empleados", (req, res) => {
    db.query('SELECT * FROM empleados',
        (err, result) => {
            if(err){
                console.log(err);
                //res.status(500).send("Error al listar los empleados");
            }else{
                console.log(result);
                res.send(result);
            }
        }
    );
});

//recibe valores
//id para saber cual cambiar
app.put("/update", (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    db.query('UPDATE empleados SET nombre=?,edad=?,pais=?,cargo=?,anios=? WHERE id=?', [nombre, edad, pais, cargo, anios, id],
        (err, result) => {
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    );
});


app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM empleados WHERE id=?', [id],
        (err, result) => {
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    );
});


app.listen(3001,() => {
    console.log('corriendo en el puerto 3001')
})