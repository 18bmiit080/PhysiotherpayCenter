import React from 'react'
import {FaBars} from 'react-icons/fa'
import {Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, NavBtn, NavBtnLink} from './NavbarElements';

const Navbar = () => {
  return (
  <>
  <Nav>
      <NavbarContainer>
          <NavLogo to="/">
              Physiotherapy Center
          </NavLogo>
          <MobileIcon>
              <FaBars />
          </MobileIcon>
          <NavMenu>
              <NavItem>
                  <NavLinks to="about">About</NavLinks>
              </NavItem>
              <NavItem>
                  <NavLinks to="gallery">Gallery</NavLinks>
              </NavItem>
              <NavItem>
                  <NavLinks to="services">Services</NavLinks>
              </NavItem>
            </NavMenu>
            <NavBtn>
                <NavBtnLink to="/signin">Sign In</NavBtnLink>
            </NavBtn>
            <NavBtn>
                <NavBtnLink to="/login">Login</NavBtnLink>
            </NavBtn>
      </NavbarContainer>
  </Nav>
  </>
  )
}

export default Navbar