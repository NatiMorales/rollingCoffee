import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Footer from "./components/common/Footer";
import Menu from "./components/common/Menu";
import Error404 from "./components/pages/Error404";
import Administrador from "./components/pages/Administrador";
import Inicio from "./components/pages/Inicio";
import FormularioProducto from './components/pages/producto/FormularioProducto';

function App() {
  return (
    <>
      <Menu></Menu>
      {/* <Inicio></Inicio> */}
      {/* <Administrador></Administrador> */}
      {/* <FormularioProducto></FormularioProducto> */}
      <Error404></Error404>
      <Footer></Footer>
    </>
  );
}

export default App;
