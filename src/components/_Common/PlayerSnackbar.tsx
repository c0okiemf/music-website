import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import AudioPlayer from './AudioPlayer';
import { alpha, styled } from '@mui/material/styles';
import Draggable from 'react-draggable';
import { Typography } from '@mui/material';
import InteractiveSoundAnimation from './InteractiveSoundAnimation';
import useScreenSize from '../../tools/useScreenSize';
import CloseIcon from '@mui/icons-material/Close';
import { forwardRef } from 'react';
import Fade from '@mui/material/Fade';

const DraggableWrapper = styled('div')(() => ({
    cursor: "grab",
}));

const Wrapper = styled('div')(() => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
}));

const MusicSnackbar = styled(Snackbar)(({ theme }) => ({
    background: 'none',
    '.MuiPaper-root': {
        background: 'transparent',
        boxShadow: 'none',
        border: 'none',
    }
}));

const StyledAudioPlayer = styled(forwardRef(AudioPlayer))(({ theme }) => ({
    background: theme.modalBackground,
    [theme.breakpoints.down('md')]: {
        width: '100%',
        position: 'fixed',
        left: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'end',
    }
}));

const CloseButton = styled(Button)(() => ({
    position: 'absolute',
    width: 16,
    minWidth: 16,
    height: 16,
    top: 16,
    right: 16,
    padding: 0,
}));

const StyledCloseIcon = styled(CloseIcon)(() => ({
    width: "100%",
    height: "100%",
    "path": {
        transformOrigin: "center",
        transform: "scale(1.5)",
    }
}));

const MobilePlayerWrapper = styled('div')(({ theme }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: alpha(theme.palette.background.paper, 0.7),
}));

interface Props {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PlayerSnackbar({ isOpen, setIsOpen }: Props) {
    const { isDesktop } = useScreenSize();
    const handleClick = () => {
        setIsOpen((prev) => !prev);
    };

    const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsOpen(false);
    };

    const action = isDesktop ? (
        <Draggable>
            <DraggableWrapper>
                <StyledAudioPlayer />
            </DraggableWrapper>
        </Draggable>
    ) : (
        <MobilePlayerWrapper>
            <StyledAudioPlayer>
                <CloseButton onClick={handleClose}>
                    <StyledCloseIcon color="action" />
                </CloseButton>
            </StyledAudioPlayer>
        </MobilePlayerWrapper>
    );

    return (
        <Wrapper>
            {isDesktop && <InteractiveSoundAnimation />}
            <Button onClick={handleClick}>
                <Typography color="textSecondary">{isOpen ? "Close" : "Open"} Player</Typography>
            </Button>
            <MusicSnackbar
                open={isOpen}
                onClose={handleClose}
                action={action}
                TransitionComponent={Fade}
            />
        </Wrapper>
    );
}