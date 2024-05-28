import { useContext } from "react"
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"
import { AuthContext } from "../../contexts/auth.context"
import "./Navigation.css"
import { Link } from "react-router-dom"


const Navigation = () => {

  const { logout, loggedUser } = useContext(AuthContext)

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/welcome">WaveScope</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/beaches" className="link">
              <Nav.Link as="span">Beaches</Nav.Link>
            </Link>
            <Link to="/marine-life" className="link">
              <Nav.Link as="span">Marine Life</Nav.Link>
            </Link>
            <Link to="/sightings" className="link">
              <Nav.Link as="span">Sightings</Nav.Link>
            </Link>
            {
              loggedUser
              &&
              <>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
                <Link to={'/profile'} className="nav-link">Profile</Link>

              </>
            }
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation