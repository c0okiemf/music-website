import { Tabs, Tab } from "@mui/material";
import React from "react";
import { useConfig } from "../../tools/useConfig";
import useScreenSize from "../../tools/useScreenSize";
import VideoCategory from "./VideoCategory";

function VideoList() {
    const [currentTab, setCurrentTab] = React.useState(0);
    const config = useConfig();
    const { isDesktop } = useScreenSize();

    const videoCategories = config?.video?.categories || [];

    return <>
        {isDesktop ? (
            <>
                <Tabs value={currentTab} onChange={(_, val) => setCurrentTab(val)} >
                    {videoCategories.map((category, index) => (
                        <Tab label={category.title} value={index} key={category.title} />
                    ))}
                </Tabs>
                {videoCategories[currentTab] && (
                    <VideoCategory title={videoCategories[currentTab].title} items={videoCategories[currentTab].items} />
                )}
            </>
        ) : (
            <>
                {videoCategories.map((category) => (
                    <VideoCategory title={category.title} items={category.items} />
                ))}
            </>
        )}
    </>;
}

export default VideoList;
