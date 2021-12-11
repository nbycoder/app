import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
    colors: {
        bg: 'rgb(136, 172, 238)',
        output: 'rgb(71, 92, 148, 0.65)',
        prev: 'rgb(230, 230, 250, 0.75)',
        curr: 'rgb(230, 230, 250)',
        btn: 'rgb(194, 206, 237, 0.75)',
        btntext: 'rgb(12, 38, 107)',
        hover: 'rgb(194, 206, 237)'
    }
}

const Theme = ({children}) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default Theme