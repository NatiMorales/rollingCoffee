import { Button, Table } from "react-bootstrap";
import ItemProducto from "./producto/ItemProducto";
import { useEffect, useState } from "react";
import { leerProductosAPI } from "../../helpers/queries";

const Administrador = () => {
const [productos, setProductos] = useState([]);

useEffect(()=>{
  consultarAPI();
}, [])

const consultarAPI = async() => {
  try{
    const respuesta = await leerProductosAPI();
    setProductos(respuesta);
  } catch(error){
    console.log(error);
  }
  
}

  return (
    <section className="container mainSection">
      <div className="d-flex justify-content-between align-items-center mt-5">
        <h1 className="display-4 ">Productos disponibles</h1>
        <Button className="btn btn-primary" >
          <i className="bi bi-file-earmark-plus"></i>
        </Button>
      </div>
      <hr />
      <Table responsive striped bordered hover>
        <thead>
          <tr className="text-center">
            <th>Cod</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>URL de Imagen</th>
            <th>Categoria</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {
            productos.map((producto)=> <ItemProducto key={producto.id} producto={producto}></ItemProducto>)
          }
          
        </tbody>
      </Table>
    </section>
  );
};

export default Administrador;
