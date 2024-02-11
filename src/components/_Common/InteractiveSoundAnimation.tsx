import React from "react";
import { Button, styled } from "@mui/material";
import { useMusic } from "../../tools/useMusic";

const StyledSoundAnimation = styled('img')(({ theme }) => ({
    height: 50,
    width: 'auto',
    filter: theme.filterPrimary,
}));

function InteractiveSoundAnimation() {
    const { paused, pauseTrack, resumeTrack } = useMusic();

    return <Button onClick={() => {
        if (paused) {
            resumeTrack();
        } else {
            pauseTrack();
        }
    }}>
        <StyledSoundAnimation src={paused ? "/sound.png" : "/sound.gif"} alt="sound" />
    </Button>;
}

export default InteractiveSoundAnimation;