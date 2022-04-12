import React from 'react'
import { SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarLink, SidebarMenu, SideBtnWrap, SidebarRoute  } from './SidebarElement'

const Sidebar = ({isOpen, toggle}) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
        <Icon onClick={toggle}>
            <CloseIcon />
        </Icon>
        <SidebarWrapper>
            <SidebarMenu>
                <SidebarLink to="about">
                    About
                </SidebarLink>
                <SidebarLink to="gallery">
                    Gallery
                </SidebarLink>
                <SidebarLink to="services">
                    Services
                </SidebarLink>
            </SidebarMenu>

        <SideBtnWrap>
            <SidebarRoute to="/signin">
                Sign In
            </SidebarRoute>
        </SideBtnWrap>
        </SidebarWrapper>
    </SidebarContainer>
  )
}

export default Sidebar