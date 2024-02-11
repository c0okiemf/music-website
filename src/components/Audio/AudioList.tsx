import React from 'react';
import AudioItem from './AudioItem';
import { Skeleton, Typography, styled } from '@mui/material';
import { TrackMetadata, useConfig } from '../../tools/useConfig';
import { useMusic } from '../../tools/useMusic';

const CategoryWrapper = styled('div')(({ theme }) => ({
    marginTop: 32,
    width: '100%',
    [theme.breakpoints.down('md')]: {
        marginTop: 16,
    }
}));

const ItemWrapper = styled("div")(({ theme }) => ({
    marginTop: 32,
    [theme.breakpoints.down('md')]: {
        marginTop: 16,
    }
}));

function AudioList() {
    const { playTrack, currentTrack, paused, pauseTrack, resumeTrack } = useMusic();
    const config = useConfig();
    const groupedAudio = config?.audio?.categories || [];

    const onItemClick = (track: TrackMetadata) => () => {
        if (currentTrack?.src === track.src) {
            if (paused) {
                resumeTrack()
            } else {
                pauseTrack()
            }
        } else {
            playTrack(track)
        }
    }

    return (
        <div>
            {groupedAudio.length > 0 ? groupedAudio.map((group) => (
                <CategoryWrapper key={group.title}>
                    <Typography variant="h4" color="textSecondary">{group.title}</Typography>
                    {group.tracks.map((track) => (
                        <ItemWrapper>
                            <AudioItem
                                isPlaying={currentTrack?.src === track.src && !paused}
                                key={track.title}
                                metadata={track}
                                onClick={onItemClick(track)}
                            />
                        </ItemWrapper>
                    ))}
                </CategoryWrapper>
            )) : (
                Array.from(Array(5).keys()).map((_, index) => (
                    <Skeleton key={index} variant="rectangular" width={"100%"} height={120} />
                ))
            )}
        </div>
    );
}

export default AudioList;
