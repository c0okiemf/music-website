import { useEffect, useState } from "react";

export type LayoutItem = {
    variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p",
    type: "text",
    isMainHeader?: boolean,
    isBold?: boolean,
    text: string
} | {
    variant: "textBlock",
    type: "element",
    content: LayoutItem[],
} | {
    variant: "p",
    type: "compoundText",
    content: LayoutItem[],
} | {
    type: "logo",
    src: string,
    size?: "large",
}

export interface VideoItemType {
    title: string,
    src: string,
}

export interface TrackMetadata {
    title: string;
    artist: string;
    album: string;
    pictureUrl: string;
    src: string;
}

interface Config {
    home: {
        layout: LayoutItem[]
    },
    audio: {
        categories: {
            title: string,
            tracks: TrackMetadata[],
        }[]
    },
    video: {
        categories: {
            title: string,
            items: VideoItemType[],
        }[],
    },
    social: {
        links: {
            title: string,
            url: string,
            iconSrc: string,
        }[],
    },
    copyright: {
        desktop: string,
        mobile: string,
    }
}

export const useConfig = () => {
    const [config, setConfig] = useState<Config | null>(null);

    useEffect(() => {
        fetch('/config.json')
            .then(res => res.json())
            .then(setConfig);
    }, []);

    return config;
}