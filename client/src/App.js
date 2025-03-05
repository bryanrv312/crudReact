
import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'

import Swal from 'sweetalert2'


function App() {


  //gestionar el estado hook usestate
  //declara variables de estado
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState();
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState();
  const [id, setId] = useState(0);

  const [editar, setEditar] = useState(false);

  //Lista de empleados                  //se inicializa con lista vacia
  const [empleadosList, setEmpleados] = useState([]);

 


  const add = () => {
    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
    }).then(() => {
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: '<strong>Registro exitoso!!!</strong>',
        html: '<i>El empleado <strong>' + nombre + '</strong> fue registrado con exito!!!</i>',
        icon: 'success',
        timer: 3000
      })
    });
  }

  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
    }).then(() => {
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: '<strong>Actualizacion exitosa!!!</strong>',
        html: '<i>El empleado <strong>' + nombre + '</strong> fue acatualizado con exito!!!</i>',
        icon: 'success',
        timer: 3000
      })
    });
  }

  const deleteEmple = (val) => {

    Swal.fire({
      title: "Estas seguro de eliminar?",
      html: '<i>Eliminar a <strong>' + val.nombre + '</strong> ?</i>',
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {

        //Axios.delete("http://localhost:3001/delete/" + id, {
        Axios.delete(`http://localhost:3001/delete/${val.id}`).then(() => {
          getEmpleados();
          limpiarCampos();

          Swal.fire({
            text: val.nombre + " fue Eliminado",
            icon: 'success',
            timer: 3000
          });
        }).catch(function(error){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se logró eliminar el registro!",
            footer: JSON.parse(JSON.stringify(error)).message === "Network Error" ?
             "Intente más tarde" : JSON.parse(JSON.stringify(error)).message 
          });
        });
        
      }
  
    });
  }

  const limpiarCampos = () => {
    setAnios("");
    setEdad("");
    setNombre("");
    setPais("");
    setCargo("");
    setId("");
    setEditar(false);
  }

  const getEmpleados = () => { //extraemos los valores de la url
    Axios.get("http://localhost:3001/empleados").then((response) => { //llamada a la api para obtener la info
      setEmpleados(response.data);
    });
  }

  const editarEmpleado = (val) =>{
    setEditar(true);
    setNombre(val.nombre);
    setEdad(val.edad);
    setCargo(val.cargo);
    setPais(val.pais);
    setAnios(val.anios);
    setId(val.id);
  }

  //getEmpleados();

  useEffect(() => {
    getEmpleados();
  }, []);

  return (
    <div className="container">
      {/*<div className="App">
        
            <div className='lista'>
              
              {
                empleadosList.map((val, key) => {
                  return <div className=''> {val.nombre} </div>
                })
              }
            </div>
            
      </div> */}

      <div className="card text-center">
        <div className="card-header">
          Gestion de Empleados
        </div>
        <div className="card-body">

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre:</span>
            <input type="text"
              onChange={(event) => {
                setNombre(event.target.value);
              }}
              className="form-control" value={nombre} placeholder="Ingrese un Nombre" aria-label="nombre" aria-describedby="basic-addon1" />
          </div>

          <div className="input-group mb-3"> 
            <span className="input-group-text" id="basic-addon1">Edad:</span>
            <input type="number"  value={edad} 
              onChange={(event) => {
                setEdad(event.target.value);
              }}
              className="form-control" placeholder="Ingrese su Edad" aria-label="edad" aria-describedby="basic-addon1" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">País:</span>
            <input type="text" value={pais} 
              onChange={(event) => {
                setPais(event.target.value);
              }}
              className="form-control" placeholder="Ingrese un País" aria-label="pais" aria-describedby="basic-addon1" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cargo:</span>
            <input type="text" value={cargo}
              onChange={(event) => {
                setCargo(event.target.value);
              }}
              className="form-control" placeholder="Ingrese un Cargo" aria-label="cargo" aria-describedby="basic-addon1" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Años:</span>
            <input type="number"  value={anios}
              onChange={(event) => {
                setAnios(event.target.value);
              }}
              className="form-control" placeholder="Ingrese los Años" aria-label="anios" aria-describedby="basic-addon1" />
          </div>
        </div>
        <div className="card-footer text-muted">
          {
            editar == true ?
            <div>
              <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
              <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
            </div>
            : <button className='btn btn-success' onClick={add}>Registrar</button>
          }
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">País</th>
            <th scope="col">Cargo</th>
            <th scope="col">Experiencia</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            empleadosList.map((val, key) => {
              return  <tr key={val.id}>
                        <th> {val.id} </th>
                        <td> {val.nombre} </td>
                        <td> {val.edad} </td>
                        <td> {val.pais} </td>
                        <td> {val.cargo} </td>
                        <td> {val.anios} </td>
                        <td> 
                        <div className="btn-group" role="group" aria-label="Basic example">
                          <button type="button" 
                          onClick={()=>{
                            editarEmpleado(val)
                          }}
                          className="btn btn-info botones-espaciados">Editar</button>
                          <button type="button" onClick={() => {
                            deleteEmple(val);
                          }} className="btn btn-danger botones-espaciados">Eliminar</button>
                        </div>
                          </td>
                      </tr>
            })
          }
        </tbody>
      </table>

    </div>
  );
}

export default App;
