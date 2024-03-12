const URL_Productos = import.meta.env.VITE_API_PRODUCTO;
console.log(URL_Productos);

//GET
export const leerProductosAPI = async () => {
    try {
        const respuesta = await fetch(URL_Productos);
        const listaProductos = await respuesta.json();
        return listaProductos;
    } catch (error) {
        console.log(error);
    }
};

//GET devuelve un producto
export const obtenerProductoAPI = async (id) => {
    try {
        const respuesta = await fetch(URL_Productos + "/" + id);
        console.log(respuesta)
        //const listaProductos = await respuesta.json();
        return respuesta;
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

export const borrarProductoAPI = async(id)=>{
    try{
        const respuesta = await fetch(`${URL_Productos}/${id}`,{
            method:"DELETE"}); 
        console.log(respuesta);
        return respuesta;
    }catch(error){
        console.log(error)
    }
}