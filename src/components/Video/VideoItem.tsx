import React from "react";
import { Typography, styled } from "@mui/material";
import { VideoItemType } from "../../tools/useConfig";

const StryledVideoItem = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 8,
}));

const VideoEl = styled('iframe')(({ theme }) => ({
    width: '100%',
    height: 300,
    aspectRatio: '16 / 9',
    border: 'none',
    [theme.breakpoints.down('md')]: {
        height: 160,
    }
}));

interface Props {
    item: VideoItemType;
}

function VideoItem({ item }: Props) {
    return (
        <StryledVideoItem>
            <Typography variant="body2" sx={{ color: (theme) => theme.textSubHeader }}>{item.title}</Typography>
            <VideoEl
                src={item.src}
                allowFullScreen={true}
            />
        </StryledVideoItem>
    );
}

export default VideoItem;
