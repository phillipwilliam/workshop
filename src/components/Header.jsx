import React, { useContext } from 'react';
import { GonContext } from './Content';

const Header = () => {
    const { name } = useContext(GonContext);
    return <header>Welcome {name}</header>
}

export {
    Header
};
