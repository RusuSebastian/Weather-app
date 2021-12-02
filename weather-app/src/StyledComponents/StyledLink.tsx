import React from "react"
import {Link} from 'react-router-dom'
import styled from "styled-components"

const StyledLink = styled(Link)`
    text-decoration: none;
`;

interface LinkProps {
    route : string,
    children : JSX.Element | JSX.Element[]
}
const LinkStyled = ( {route,children} : LinkProps ) => {
    return (
        <StyledLink to={route}>
            {children}
        </StyledLink>
    )
}

export default LinkStyled
