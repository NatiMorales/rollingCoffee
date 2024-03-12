import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { crearProductoAPI, editarProductoAPI, obtenerProductoAPI } from "../../../helpers/queries";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const FormularioProducto = ({ editar, titulo}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm();

  const {id} = useParams();
  const navegacion = useNavigate();


  useEffect(()=>{
    if(editar){
      //invocar a una funcion que devuelva un producto con el id del parametro
      cargarDatosProducto();
    }
  },[])

  const cargarDatosProducto = async()=>{
    try{
      const respuesta = await obtenerProductoAPI(id);
      if(respuesta.status === 200){
        const productoEncontrado = await respuesta.json();
        //quiero cargar el productoEncontrado en el formulario
        setValue("nombreProducto", productoEncontrado.nombreProducto);
        setValue("precio", productoEncontrado.precio);
        setValue("categoria", productoEncontrado.categoria);
        setValue("imagen", productoEncontrado.imagen);
        setValue("descripcionBreve", productoEncontrado.descripcionBreve);
        setValue("descripcionAmplia", productoEncontrado.descripcionAmplia);
      }
    }catch(error){
      console.log(error)
    }
  }

  const productoValidado = async (producto) => {
    console.log(producto);
    if (editar) {
      //agregar la logica de editar
      console.log("aqui tengo que editar");
      //tomar los datos del producto validado y enviarlo a la api para actualizar
      const respuesta = await editarProductoAPI(producto,id);
      if(respuesta.status === 200){
        Swal.fire({
          title: "Producto modificado",
          text: `El producto "${producto.nombreProducto}" fue modificado correctamente`,
          icon: "success",
        });
         //redireccionar a la pagina del administrador
         navegacion("/administrador");
      } else{
        Swal.fire({
          title: "Ocurrio un error",
          text: `El producto "${producto.nombreProducto}" no pudo ser modificado. Intente esta operacion en unos minutos`,
          icon: "error",
        });
      }
    } else {
      //solicitar a la api guardar un producto nuevo
      const respuesta = await crearProductoAPI(producto);
      if (respuesta.status === 201) {
        //se creo el producto
        Swal.fire({
          title: "Producto creado",
          text: `El producto "${producto.nombreProducto}" fue creado correctamente`,
          icon: "success",
        });
        reset();
      } else {
        Swal.fire({
          title: "Ocurrio un error",
          text: `El producto "${producto.nombreProducto}" no pudo ser creado. Intente esta operacion en unos minutos`,
          icon: "error",
        });
      }
    }
  };

  return (
    <section className="container mainSection">
      <h1 className="display-4 mt-5">{titulo}</h1>
      <hr />
      <Form className="my-4" onSubmit={handleSubmit(productoValidado)}>
        <Form.Group className="mb-3" controlId="formNombreProdcuto">
          <Form.Label>Producto*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Cafe"
            {...register("nombreProducto", {
              required: "El nombre del producto es obligatorio",
              minLength: {
                value: 2,
                message:
                  "El nombre del producto debe tener como minimo 2 caracteres",
              },
              maxLength: {
                value: 20,
                message:
                  "El nombre del producto debe tener como maximo 20 caracteres",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.nombreProducto?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Precio*</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ej: 50"
            {...register("precio", {
              required: "El precio del producto es obligatorio",
              min: {
                value: 1,
                message: "El precio debe tener un valor minimo de 1",
              },
              max: {
                value: 100000,
                message: "El precio debe tener un valor maximo de 100000",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.precio?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formImagen">
          <Form.Label>Imagen URL*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: https://www.pexels.com/es-es/vans-en-blanco-y-negro-fuera-de-la-decoracion-para-colgar-en-la-pared-1230679/"
            {...register("imagen", {
              required: "La imagen es obligatoria",
              pattern: {
                value: /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/,
                message: "Debe ingresar una URL valida (jpg|jpeg|gif|png)",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.imagen?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Categoría*</Form.Label>
          <Form.Select
            {...register("categoria", {
              required: "La categoria es obligatoria",
            })}
          >
            <option value="">Seleccione una opcion</option>
            <option value="Infusiones">Infusiones</option>
            <option value="Batidos">Batidos</option>
            <option value="dulce">Dulce</option>
            <option value="salado">Salado</option>
          </Form.Select>
          <Form.Text className="text-danger">
            {errors.categoria?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formImagen">
          <Form.Label>Descripción breve*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Una taza de café suave y aromático."
            as="textarea"
            {...register("descripcionBreve", {
              required: "La descripcion del producto es obligatorio",
              minLength: {
                value: 5,
                message:
                  "La descripcion del producto debe tener como minimo 5 caracteres",
              },
              maxLength: {
                value: 50,
                message:
                  "La descripcion del producto debe tener como maximo 50 caracteres",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.descripcionBreve?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formImagen">
          <Form.Label>Descripción Amplia*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: El café americano es una bebida caliente que consiste en un espresso diluido con agua caliente, lo que resulta en una taza de café suave y aromático. Es una opción popular para aquellos que prefieren un café menos intenso que el espresso tradicional. Perfecto para disfrutar en cualquier momento del día."
            as="textarea"
            {...register("descripcionAmplia", {
              required: "La descripcion del producto es obligatorio",
              minLength: {
                value: 50,
                message:
                  "La descripcion del producto debe tener como minimo 50 caracteres",
              },
              maxLength: {
                value: 300,
                message:
                  "La descripcion del producto debe tener como maximo 300 caracteres",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.descripcionAmplia?.message}
          </Form.Text>
        </Form.Group>

        <Button type="submit" variant="success">
          Guardar
        </Button>
      </Form>
    </section>
  );
};

export default FormularioProducto;
