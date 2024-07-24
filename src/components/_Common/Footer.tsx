import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import { useConfig } from '../../tools/useConfig';
import useScreenSize from '../../tools/useScreenSize';

const FooterBox = styled(Box)(({ theme }) => ({
  borderTop: '1px solid',
  borderColor: theme.palette.divider,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: "16px 32px",
  background: theme.palette.background.paper,
  width: '100%',
  [theme.breakpoints.down('md')]: {
    padding: "8px 16px",
  }
}));

const IconBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'start',
  alignItems: 'center',
  gap: 32,
  [theme.breakpoints.down('md')]: {
    gap: 16,
  }
}));

const Icon = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: 'contain',
  [theme.breakpoints.down('md')]: {
    width: 32,
    height: 32,
  }
}));

const Copyright = styled(Typography)(
  ({ theme }) => ({
    color: theme.palette.text.primary,
    [theme.breakpoints.down('md')]: {
      textAlign: 'end'
    }
  })
);

function Footer() {
  const { isDesktop } = useScreenSize();
  const config = useConfig();

  return (
    <FooterBox>
      <IconBox>
        {config?.social?.links?.map((link) => (
          <a href={link.url} target="_blank" rel="noopener noreferrer" title={link.title} key={link.title}>
            <Icon src={link.iconSrc} />
          </a>
        ))}
      </IconBox>
      <div>
        <Copyright>©{new Date().getFullYear()} {isDesktop ? config?.copyright?.desktop : config?.copyright?.mobile}</Copyright>
      </div>
    </FooterBox>
  );
}

export default Footer;
