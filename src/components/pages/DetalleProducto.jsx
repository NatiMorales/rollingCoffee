import { Container, Card, Row, Col } from "react-bootstrap";

const DetalleProducto = () => {
  return (
    <Container className="my-3 mainSection">
      <Card>
        <Row>
          <Col md={6}>
            <Card.Img
              variant="top"
              src="https://images.pexels.com/photos/414555/pexels-photo-414555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
          </Col>
          <Col md={6}>
            <Card.Body>
              <Card.Title className="primary-font">Capuchino</Card.Title>
              <hr />
              <Card.Text>
              El café americano es una bebida caliente que consiste en un espresso diluido con agua caliente, lo que resulta en una taza de café suave y aromático. Es una opción popular para aquellos que prefieren un café menos intenso que el espresso tradicional. Perfecto para disfrutar en cualquier momento del día.
              <br/>
              <br/>
              <span className="primary-font fw-semibold ">Categoria:</span> Infusiones
              <br className='mb-3'/>
              <span className="primary-font fw-semibold ">Precio: $1000</span></Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default DetalleProducto;
