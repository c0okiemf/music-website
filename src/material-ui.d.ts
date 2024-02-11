import '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Theme {
        modalBackground: string;
        filterPrimary: string;
        textSubHeader: string;
    }
    interface ThemeOptions {
        modalBackground?: string;
        filterPrimary?: string;
        textSubHeader?: string;
    }
}