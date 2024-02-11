import * as React from 'react';
import { GlobalStyles } from '@mui/system';
import { useTheme } from '@mui/material';

export default function GlobalCss() {
  const theme = useTheme();
  return (
    <GlobalStyles styles={{
      html: {
        height: '100%',
      },
      body: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        margin: 0,
        fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
          'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
          sans-serif`,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        backgroundColor: theme.palette.background.paper,
        '@media only screen and (max-width: 900px)': {
          fontSize: '0.75rem',
        },
      },
      '#root': {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      },
      code: {
        fontFamily: `source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
          monospace`,
      },
      '*': {
        boxSizing: 'border-box',
      },
    }} />
  );
}