import React from "react";
import styled from 'styled-components';

import './app-header.css';

const Header = styled.div`
display: flex;
align-items: flex-end;
justify-content: space-between;
h1 {
    font-size: 26px;
    color: ${props => props.colored ? 'red' : 'black'};
    :hover {
        color: blue;
    }
}
h2 {
    font-size: 1.2rem;
    color: grey;
}`;

const AppHeader = ({likedItems, allItems}) => {
    return (
        <Header colored as='a'>
            <h1>Max Yasunos</h1>
            <h2>{allItems} записей, из них понравилось {likedItems}</h2>
        </Header>
    )
}

export default AppHeader;