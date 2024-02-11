import React from 'react';
import { Typography, styled } from '@mui/material';
import { TrackMetadata } from '../../tools/useConfig';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

interface ListItemProps {
    animate: boolean;
}

const ListItem = styled('li')<ListItemProps>(({ theme, animate }) => ({
    display: 'flex',
    position: 'relative',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #ccc',
    width: '100%',
    transition: 'transform 0.5s',
    '&:hover': {
        transform: 'scale(1.05)',
        cursor: `pointer`,
        '& .playPauseIcon': {
            opacity: 1,
        },
    },
    background: animate ? 'linear-gradient(270deg, #1D1D1D, #AA2A20)' : "none",
    backgroundSize: '600% 600%',
    boxShadow: animate ? '0 0 50px 40px #1D1D1D inset' : "none",
    animation: animate ? 'AnimationName 2s ease infinite' : "none",
    '@keyframes AnimationName': {
        '0%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
        '100%': { backgroundPosition: '0% 50%' },
    },
    [theme.breakpoints.down('md')]: {
        boxShadow: animate ? '0 0 30px 20px #1D1D1D inset' : "none",
    }
}));

const AlbumCover = styled('img')(({ theme }) => ({
    width: 100,
    height: 100,
    borderRadius: '8px',
    boxShadow: '0 0 10px 0 rgba(0,0,0,0.5)',
    objectFit: 'cover',
    [theme.breakpoints.down('md')]: {
        width: 50,
        height: 50,
    }
}));

const TextWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginLeft: '8px',
    padding: '16px 0',
    [theme.breakpoints.down('md')]: {
        padding: 0,
    }
}));

const Title = styled(Typography)(({ theme }) => ({
    textAlign: 'right',
    [theme.breakpoints.down('md')]: {
        fontSize: "0.75rem",
    }
}));

const AlbumTitle = styled(Typography)(({ theme }) => ({
    marginTop: '4px',
    [theme.breakpoints.down('md')]: {
        fontSize: "0.5rem",
    }
}));

const PlayPauseIcon = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    transition: 'opacity 0.3s',
    opacity: 0,
    width: 50,
    height: 50,
    color: theme.palette.text.secondary,
    'svg': {
        width: '100%',
        height: '100%',
        filter: 'drop-shadow(0px 0px 3px black) drop-shadow(0px 0px 10px black)',
    }
}));

interface Props {
    metadata: TrackMetadata;
    onClick: () => void;
    isPlaying: boolean;
}

function AudioItem({ metadata, onClick, isPlaying }: Props) {
    return (
        <ListItem animate={isPlaying} onClick={onClick}>
            <AlbumCover src={metadata.pictureUrl} alt={metadata.title} />
            <TextWrapper>
                <Title fontWeight={500} variant="h5" color="textSubHeader" sx={{ color: (theme) => theme.textSubHeader }}>{metadata.artist} - {metadata.title}</Title >
                <AlbumTitle color="textPrimary">{metadata.album}</AlbumTitle >
            </TextWrapper>
            <PlayPauseIcon className='playPauseIcon'>
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </PlayPauseIcon>
        </ListItem>
    );
}

export default AudioItem;
