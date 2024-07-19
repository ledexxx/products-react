import React, { useEffect, useState } from "react";
import axios from 'axios';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_alerta } from "../functions";

const ShowClient = () => {
  const url = 'http://api.maytechsoluciones.com/api/controller/cliente.php?op=ShowAll';
  const [client, setClient] = useState([]);
  const [cli_id, setId] = useState('');
  const [cli_nom, setNom] = useState('');
  const [pais_id, setPais] = useState('');
  const [doc, setDoc] = useState('');
  const [cli_correo, setCorreo] = useState('');
  const [cli_cel, setCelu] = useState('');
  const [fecha_rg, setReg] = useState('');
  const [fecha_up, setFechaUp] = useState('');
  const [est, setEst] = useState('');

  useEffect(() => {
    getClients();
  }, []);

  const getClients = async () => {
    try {
      const respuesta = await axios.get(url);
      console.log("Respuesta de la API:", respuesta.data); // Añade este log para ver la respuesta
      setClient(respuesta.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <div className='app'>
      <div className='container-fluid'>
        <div className='row mt-3'>
          <div className='col-md-4 offset-4'>
            <div className='d-grid mx-auto'>
              <button className='btn btn-primary' data-bs-toggle='modal' data-bs-target='#modalClient'>
                <i className='fa-solid fa-circle-plus'></i> Añadir
              </button>
            </div>
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-md-12'>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Pais ID</th>
                  <th>Documento</th>
                  <th>Correo</th>
                  <th>Celular</th>
                  <th>Fecha Registro</th>
                  <th>Fecha Actualización</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {client.length > 0 ? (
                  client.map((cli) => (
                    <tr key={cli.cli_id}>
                      <td>{cli.cli_id}</td>
                      <td>{cli.cli_nom}</td>
                      <td>{cli.pais_id}</td>
                      <td>{cli.doc}</td>
                      <td>{cli.cli_correo}</td>
                      <td>{cli.cli_cel}</td>
                      <td>{cli.fecha_rg}</td>
                      <td>{cli.fecha_up}</td>
                      <td>{cli.est}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center">No hay datos disponibles</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className='modal fade' id='modalClient' tabIndex="-1" aria-labelledby='modalClientLabel' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='modalClientLabel'>Añadir Cliente</h5>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              {/* Aquí puedes añadir el formulario para añadir clientes */}
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
              <button type='button' className='btn btn-primary'>Guardar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowClient;
