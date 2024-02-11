import React from 'react';
import { styled } from '@mui/material';

const Wrapper = styled('div')(({ theme }) => ({
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'start',
    backgroundColor: theme.palette.background.paper,
    padding: "32px 32px 128px 32px",
    maxWidth: 1024,
    width: "100%",
    margin: 'auto',
    height: '100%',
    boxShadow: '5px 0 15px 0px rgba(128, 128, 128, 0.5), -5px 0 15px 0px rgba(128, 128, 128, 0.5)',
    [theme.breakpoints.down('md')]: {
        padding: "16px 16px 64px 16px",
    },
}));

interface Props {
    children: React.ReactNode;
}

function PageWrapper({ children }: Props) {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    );
}

export default PageWrapper;
