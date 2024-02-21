const URL_Productos = import.meta.env.VITE_API_PRODUCTO;
console.log(URL_Productos);

//solicitud GET
export const leerProductosAPI = async () => {
    try {
        const respuesta = await fetch(URL_Productos);
        const listaProductos = await respuesta.json();
        return listaProductos;
    } catch (error) {
        console.log(error);
    }
};

//POST
export const crearProductoAPI = async(productoNuevo)=>{
    try{
        const respuesta = await fetch(URL_Productos,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(productoNuevo)
        });
        console.log(respuesta);
        return respuesta;
    }catch(error){
        console.log(error)
    }
}



//PUT - PATCH
//DELETE