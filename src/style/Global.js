import { createGlobalStyle } from "styled-components";

export const Global = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap');

    * {
        box-sizing: border-box;
    }
    body {
         background-color: ${({theme}) => theme.colors.bg};
         margin: 0;
         font-family: 'Poppins', sans-serif;
    }
`