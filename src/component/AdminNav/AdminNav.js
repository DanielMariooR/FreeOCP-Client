import { Navbar, Nav, Container } from 'react-bootstrap';

const AdminNav = () => {

    return (
        <Navbar collapseOnSelect expand="lg" variant="dark">
            <Container>
                <Navbar.Brand href="/admin/problems"><h2 className='my-3 mx-2'>FREEOCP</h2></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Nav className="admin mr-auto">
                    Admin
                </Nav>
            </Container>
        </Navbar>
    )
}

export default AdminNav;