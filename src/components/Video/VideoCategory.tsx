import React from "react";
import { VideoItemType } from "../../tools/useConfig";
import { Typography, styled } from "@mui/material";
import VideoItem from "./VideoItem";

const Wrapper = styled('div')(({ theme }) => ({
    marginTop: 32,
    [theme.breakpoints.down('md')]: {
        marginTop: 16,
    }
}));

const VideosGrid = styled('div')(({ theme }) => ({
    display: 'grid',
    gridTemplateRows: 'repeat(auto-fill, 1fr)',
    gridGap: 32,
    marginTop: 16,
    [theme.breakpoints.down('md')]: {
        gridGap: 16,
    }
}));

interface CategoryProps {
    title: string;
    items: VideoItemType[];
}

function VideoCategory({ title, items }: CategoryProps) {
    return (
        <Wrapper>
            <Typography variant="h4" color="textSecondary">{title}</Typography>
            <VideosGrid>
                {items.map((item) => (
                    <VideoItem item={item} />
                ))}
            </VideosGrid>
        </Wrapper>
    )
}

export default VideoCategory;