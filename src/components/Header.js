import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import '../styles/header.css'

function Header() {
    return (
        <div className='header-wrapper'>
        <Navbar className="nav-bar" bg="dark" variant="dark" expand="sm">
        <Container fluid>
           <Navbar.Brand as={Link} to="/" ><h4 >Movie App</h4></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav
                className="ms-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
            >
                <Nav.Link as={Link} to="/" >Home</Nav.Link>
                <Nav.Link as={Link} to="/favorites" >Favorites</Nav.Link>
                <Nav.Link as={Link} to="/about" >About</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        </div>
    )
}

export default Header
