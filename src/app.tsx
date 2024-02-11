import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from './tools/routes';
import HomePage from './pages/HomePage';
import VideoPage from './pages/VideoPage';
import AudioPage from './pages/AudioPage';
import { ThemeProvider, styled } from '@mui/material/styles';
import Header from './components/_Common/Header';
import Footer from './components/_Common/Footer';
import { MusicProvider } from './tools/useMusic';
import theme from './theme';
import GlobalCss from './GlobalCss';

const Wrapper = styled('div')(({ theme }) => ({
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    background: theme.palette.background.default,
}));

const paths = [
    {
        path: ROUTES.HOME,
        element: <HomePage />,
    },
    {
        path: ROUTES.VIDEO,
        element: <VideoPage />,
    },
    {
        path: ROUTES.AUDIO,
        element: <AudioPage />,
    },
];

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalCss />
            <BrowserRouter basename="/">
                <MusicProvider>
                    <Wrapper>
                        <Header />
                        <Routes>
                            {paths.map(({ path, element }) => (
                                <Route key={path} path={path} element={element} />
                            ))}
                        </Routes>
                        <Footer />
                    </Wrapper>
                </MusicProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
