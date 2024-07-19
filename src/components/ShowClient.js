import React, { useEffect, useState } from "react";
import axios from 'axios';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ShowClient = () => {
  const url = 'http://api.maytechsoluciones.com/api/controller/cliente.php?op=ShowAll';
  const [client, setClient] = useState([]);
  const [cli_nom, setNom] = useState('');
  const [pais_id, setPais] = useState('');
  const [doc, setDoc] = useState('');
  const [cli_correo, setCorreo] = useState('');
  const [cli_cel, setCelu] = useState('');
  const [fecha_rg, setReg] = useState('');
  const [est, setEst] = useState('1');

  useEffect(() => {
    getClients();
  }, []);

  const getClients = async () => {
    try {
      const respuesta = await axios.get(url);
      console.log("Respuesta de la API:", respuesta.data); 
      setClient(respuesta.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleCreateClient = async () => {
    const newClient = {
      cli_nom,
      pais_id,
      doc,
      cli_correo,
      cli_cel,
      fecha_rg,
      est
    };

    try {
      const response = await axios.post('http://api.maytechsoluciones.com/api/controller/cliente.php?op=Insert', newClient);
      if (response.data.success) {
        Swal.fire("Éxito", "Cliente añadido correctamente", "success");
        getClients();
      } else {
        Swal.fire("Error", "Hubo un problema al añadir el cliente", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Hubo un problema al añadir el cliente", "error");
      console.error("Error creating client: ", error);
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
                      <td>{cli.est}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">No hay datos disponibles</td>
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
              <form>
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input type="text" className="form-control" value={cli_nom} onChange={(e) => setNom(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Pais ID</label>
                  <input type="text" className="form-control" value={pais_id} onChange={(e) => setPais(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Documento</label>
                  <input type="text" className="form-control" value={doc} onChange={(e) => setDoc(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Correo</label>
                  <input type="email" className="form-control" value={cli_correo} onChange={(e) => setCorreo(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Celular</label>
                  <input type="text" className="form-control" value={cli_cel} onChange={(e) => setCelu(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Fecha Registro</label>
                  <input type="date" className="form-control" value={fecha_rg} onChange={(e) => setReg(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Estado</label>
                  <input type="text" className="form-control" value={est} onChange={(e) => setEst(e.target.value)} />
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
              <button type='button' className='btn btn-primary' onClick={handleCreateClient}>Guardar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowClient;
