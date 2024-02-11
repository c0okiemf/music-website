import { Breakpoints, createTheme, responsiveFontSizes } from "@mui/material";

const breakpoints: Breakpoints = createTheme().breakpoints;

const theme = responsiveFontSizes(createTheme({
    modalBackground: '#ECDECD',
    filterPrimary: 'invert(62%) sepia(59%) saturate(6319%) hue-rotate(345deg) brightness(92%) contrast(105%)',
    textSubHeader: "#F56B53",
    palette: {
        primary: {
            main: '#EF2D22',
        },
        background: {
            default: '#121212',
            paper: '#1D1D1D',
        },
        text: {
            primary: '#ECDECD',
            secondary: '#EF2D22',
        },
        divider: '#444',
    },
    typography: {
        h1: {
            fontSize: '2.5rem',
        },
        h2: {
            fontSize: '2rem',
        },
        h3: {
            fontSize: '1.75rem',
        },
        h4: {
            fontSize: '1.5rem',
        },
        h5: {
            fontSize: '1.25rem',
        },
        h6: {
            fontSize: '1rem',
        },
        subtitle1: {
            fontSize: '0.875rem',
        },
        subtitle2: {
            fontSize: '0.75rem',
        },
        body1: {
            fontSize: '1rem',
            [breakpoints.down('md')]: {
                fontSize: '0.8rem',
            },
        },
        body2: {
            fontSize: '0.875rem',
        },
        button: {
            fontSize: '0.875rem',
        },
        caption: {
            fontSize: '0.75rem',
        },
        overline: {
            fontSize: '0.625rem',
        },
    },
}));

export default theme;
