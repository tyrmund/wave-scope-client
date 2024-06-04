import { useContext, useState } from "react"
import { Navbar, Nav, Container, Image } from "react-bootstrap"
import { Link } from "react-router-dom"

import { AuthContext } from "../../contexts/auth.context"
import "./Navigation.css"


const Navigation = () => {

  const { loggedUser } = useContext(AuthContext)
  const [expanded, setExpanded] = useState(true)

  return (
    <Navbar expand="lg" className="Navbar m-auto" expanded={!expanded}>
      <Container>
        <Navbar.Brand href="/welcome" >WaveScope</Navbar.Brand>
        {
          loggedUser
          &&
          <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="Navicon" onClick={() => setExpanded(!expanded)} />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Navbar.Text as="span" style={{ marginRight: '20px', marginLeft: '20px', color: '#FFFBEB' }}>Welcome, {loggedUser.username}!</Navbar.Text>
                <Link to="/beaches" className="link" onClick={() => setExpanded(true)}>
                  <Nav.Link as="span">Beaches</Nav.Link>
                </Link>

                <Link to="/marine-life" className="link" onClick={() => setExpanded(true)}>
                  <Nav.Link as="span">Marine Life</Nav.Link>
                </Link>

                <Link to="/sightings" className="link" onClick={() => setExpanded(true)}>
                  <Nav.Link as="span">Sightings</Nav.Link>
                </Link>

                <Link to="/about-us" className="link" onClick={() => setExpanded(true)}>
                  <Nav.Link as="span">About Us</Nav.Link>
                </Link>

                <Link to={'/profile'} className="nav-link" onClick={() => setExpanded(true)}>
                  <Image src={loggedUser.profilePic} style={{ width: '30px' }} roundedCircle />
                </Link>

              </Nav>
            </Navbar.Collapse>
          </>
        }
      </Container>
    </Navbar>
  )
}

export default Navigation