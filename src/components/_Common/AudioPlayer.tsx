import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';
import Marquee from './Marquee';
import { useMusic } from '../../tools/useMusic';
import useScreenSize from '../../tools/useScreenSize';
import theme from '../../theme';

const Widget = styled('div')(() => ({
    border: '1px solid',
    padding: 16,
    borderRadius: 16,
    width: 343,
    maxWidth: '100%',
    margin: 'auto',
    position: 'relative',
    zIndex: 1,
    backdropFilter: 'blur(40px)',
    [theme.breakpoints.down('md')]: {
        borderRadius: "16px 16px 0 0",
    }
}));

const CoverImage = styled('div')({
    width: 100,
    height: 100,
    objectFit: 'cover',
    overflow: 'hidden',
    flexShrink: 0,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.08)',
    '& > img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
});

const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
});

interface Props {
    className?: string;
    children?: React.ReactNode;
}

export default function AudioPlayer({ className, children }: Props) {
    const { isDesktop } = useScreenSize();
    const {
        paused,
        resumeTrack,
        pauseTrack,
        position,
        seek,
        currentTrack,
        duration,
        volume,
        setVolume,
        playNextTrack,
        playPrevTrack,
    } = useMusic();

    const theme = useTheme();

    function formatDuration(value: number) {
        const minute = Math.floor(value / 60);
        const secondLeft = value - minute * 60;
        return `${minute}:${secondLeft < 10 ? `0${Math.floor(secondLeft)}` : Math.floor(secondLeft)}`;
    }
    const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
    const lightIconColor =
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';

    return (
        <Widget className={className}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CoverImage>
                    <img
                        alt={`${currentTrack.artist} - ${currentTrack.title}`}
                        src={currentTrack.pictureUrl}
                    />
                </CoverImage>
                <Box sx={{ ml: 1.5, minWidth: 0 }}>
                    <Typography variant="caption" fontWeight={500}>
                        {currentTrack.album}
                    </Typography>
                    <Typography noWrap>
                        <b>{currentTrack.title}</b>
                    </Typography>
                    <Typography noWrap letterSpacing={-0.25}>
                        <Marquee text={`${currentTrack.artist} - ${currentTrack.title}`} />
                    </Typography>
                </Box>
            </Box>
            <Slider
                aria-label="time-indicator"
                size="small"
                value={position}
                min={0}
                step={1}
                max={duration}
                onChange={(_, value) => seek(value as number)}
                onMouseDown={(event) => {
                    event.stopPropagation();
                }}
                sx={{
                    color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                    height: 4,
                    '& .MuiSlider-thumb': {
                        width: 8,
                        height: 8,
                        transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                        '&::before': {
                            boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                        },
                        '&:hover, &.Mui-focusVisible': {
                            boxShadow: `0px 0px 0px 8px ${theme.palette.mode === 'dark'
                                ? 'rgb(255 255 255 / 16%)'
                                : 'rgb(0 0 0 / 16%)'
                                }`,
                        },
                        '&.Mui-active': {
                            width: 20,
                            height: 20,
                        },
                    },
                    '& .MuiSlider-rail': {
                        opacity: 0.28,
                    },
                }}
            />
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mt: -2,
                }}
            >
                <TinyText>{formatDuration(position)}</TinyText>
                <TinyText>-{formatDuration(duration - position)}</TinyText>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: -1,
                }}
            >
                <IconButton aria-label="previous song" onClick={playPrevTrack}>
                    <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
                </IconButton>
                <IconButton
                    aria-label={paused ? 'play' : 'pause'}
                    onClick={paused ? resumeTrack : pauseTrack}
                >
                    {paused ? (
                        <PlayArrowRounded
                            sx={{ fontSize: '3rem' }}
                            htmlColor={mainIconColor}
                        />
                    ) : (
                        <PauseRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} />
                    )}
                </IconButton>
                <IconButton aria-label="next song" onClick={playNextTrack} >
                    <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
                </IconButton>
            </Box>
            {isDesktop && <Stack spacing={2} direction="row" sx={{ mb: 1, px: 1 }} alignItems="center">
                <VolumeDownRounded htmlColor={lightIconColor} />
                <Slider
                    aria-label="Volume"
                    onChange={(_, value) => setVolume(value as number)}
                    onMouseDown={(event) => {
                        event.stopPropagation();
                    }}
                    value={volume}
                    sx={{
                        color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                        '& .MuiSlider-track': {
                            border: 'none',
                        },
                        '& .MuiSlider-thumb': {
                            width: 24,
                            height: 24,
                            backgroundColor: '#fff',
                            '&::before': {
                                boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                            },
                            '&:hover, &.Mui-focusVisible, &.Mui-active': {
                                boxShadow: 'none',
                            },
                        },
                    }}
                />
                <VolumeUpRounded htmlColor={lightIconColor} />
            </Stack>}
            {children}
        </Widget>
    );
}