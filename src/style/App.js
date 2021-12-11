import styled from "styled-components";

export const Calc = styled.div`
   display: grid;
   margin-top: 2rem;
   grid-template-columns: repeat(4, 6rem);
   grid-template-rows: minmax(7rem, auto) repeat(5, 6rem);
   justify-content: center;
` 

export const Two = styled.button`
    grid-column: span 2;
    background-color: ${({theme}) => theme.colors.btn};
    border: 1.4px solid ${({theme}) => theme.colors.output};
    outline: none;
    cursor: pointer;
    font-size: 1.4rem;
    color: ${({theme}) => theme.colors.btntext};
    font-weight: 500;
    &:hover, :focus {
        background-color: ${({theme}) => theme.colors.hover}
    }
`
export const Output = styled.div`
    grid-column: 1 / -1;
    background-color: ${({theme}) => theme.colors.output};
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
    padding: .75rem;
    word-wrap: break-word;
    word-break: break-all;
    .prev {
        color: ${({theme}) => theme.colors.prev};
        font-size: 1.5rem;
    }
    .curr {
        color: ${({theme}) => theme.colors.curr};
        font-size: 2.5rem;
    }
`
export const Input = styled.div` 
    color: ${({theme}) => theme.colors.input};
`
export const Btn = styled.button`
    background-color: ${({theme}) => theme.colors.btn};
    border: 1.4px solid ${({theme}) => theme.colors.output};
    outline: none;
    cursor: pointer;
    font-size: 1.4rem;
    color: ${({theme}) => theme.colors.btntext};
    font-weight: 500;
    &:hover, :focus {
        background-color: ${({theme}) => theme.colors.hover}
    }
`