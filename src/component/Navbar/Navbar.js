import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import SearchBar from '../SearchBar/SearchBar';

const NavBar = () => {

    return (
        <Navbar collapseOnSelect expand="lg" variant="dark">
            <Container>
                <Navbar.Brand href="/"><h2 className='my-3 mx-2'>FREEOCP</h2></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <SearchBar />
                    </Nav>
                    <Nav>
                        <Nav.Link href="/dashboard?page=1" className='mx-3 nav-item'>Kursus</Nav.Link>
                        <NavDropdown title="Kontribusi" id="collasible-nav-dropdown nav-item" className='mx-3'>
                            <NavDropdown.Item href="/create-course">Buat Kursus</NavDropdown.Item>
                            <NavDropdown.Item href="/create-question">Buat Soal</NavDropdown.Item>
                            <NavDropdown.Item href="/my-courses">Kursus Saya</NavDropdown.Item>
                            <NavDropdown.Item href="/my-questions">Soal Saya</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/sign-in" className='nav-item'>
                            <FontAwesomeIcon icon={ faUser } className="mx-3 fa-2xl" />
                                Masuk
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;