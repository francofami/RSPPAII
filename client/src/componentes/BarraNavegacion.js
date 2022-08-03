import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const BarraNavegacion = () => {

    const cerrarSesion = () => {
        localStorage.setItem("token", "");
    }

    return(
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="/criptomonedas">Criptomonedas</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/altaCriptomoneda">Alta</Nav.Link>
                    <Nav.Link className="justify-content-end" style={{ width: "100%" }} onClick={cerrarSesion} href="/">Cerrar sesión</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default BarraNavegacion;