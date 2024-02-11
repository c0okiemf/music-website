import { useState, useEffect, createContext, ReactNode, useContext, useMemo } from "react";
import { TrackMetadata, useConfig } from "./useConfig";

const useMusicInternal = (): MusicContextType => {
    const config = useConfig();

    const tracks = useMemo(() => config?.audio?.categories?.flatMap(category => category.tracks) ?? [], [config]);

    const [currentTrack, setCurrentTrack] = useState<TrackMetadata>({
        title: '',
        artist: '',
        album: '',
        pictureUrl: '',
        src: '',
    });
    const [position, setPosition] = useState(0);
    const [paused, setPaused] = useState(true);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        setCurrentTrack(tracks[0]);
    }, [tracks]);

    useEffect(() => {
        const audioElement = new Audio();
        setAudio(audioElement);

        const handleTimeUpdate = () => {
            setPosition(Math.floor(audioElement.currentTime));
        };

        const handleEnded = () => {
            setPaused(true);
            setPosition(0);
        };

        const handleLoadedMetadata = () => {
            setDuration(audioElement.duration);
        };

        audioElement.addEventListener('timeupdate', handleTimeUpdate);
        audioElement.addEventListener('ended', handleEnded);
        audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);

        return () => {
            audioElement.removeEventListener('timeupdate', handleTimeUpdate);
            audioElement.removeEventListener('ended', handleEnded);
            audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audioElement.src = '';
        };
    }, []);

    useEffect(() => {
        if (!audio || !currentTrack) return;

        const currentSrc = audio.src;
        const newSrc = new URL(currentTrack.src, window.location.href).href;

        if (currentSrc !== newSrc) {
            audio.src = currentTrack.src;
        }

        if (paused) {
            audio.pause();
        } else {
            audio.play();
        }
    }, [audio, currentTrack, paused]);

    useEffect(() => {
        if (!audio) return;

        if (Math.abs(audio.currentTime - position) > 1) {
            audio.currentTime = position;
        }
    }, [audio, position]);

    const changeTrack = (track: TrackMetadata) => {
        setCurrentTrack(track);
        setPosition(0);
    };

    const playTrack = (track: TrackMetadata) => {
        changeTrack(track);
        setPaused(false);
    }

    const pauseTrack = () => {
        setPaused(true);
    };

    const resumeTrack = () => {
        setPaused(false);
    };

    const seek = (newPosition: number) => {
        setPosition(newPosition);
    };

    const [volume, setVolume] = useState(audio ? audio.volume * 100 : 100);

    useEffect(() => {
        if (!audio) return;
        audio.volume = volume / 100;
    }, [volume, audio]);

    const playPrevTrack = () => {
        const currentIndex = tracks.findIndex(track => track.src === currentTrack?.src);
        const prevTrack = tracks[currentIndex - 1];
        changeTrack(prevTrack);
    };

    const playNextTrack = () => {
        const currentIndex = tracks.findIndex(track => track.src === currentTrack?.src);
        const nextTrack = tracks[(currentIndex + 1) % tracks.length];
        changeTrack(nextTrack);
    };

    return {
        tracks,
        currentTrack,
        position,
        paused,
        playTrack,
        pauseTrack,
        resumeTrack,
        seek,
        duration,
        volume,
        setVolume,
        playPrevTrack,
        playNextTrack,
    };
};

interface MusicContextType {
    tracks: TrackMetadata[];
    currentTrack: TrackMetadata;
    position: number;
    paused: boolean;
    playTrack: (track: TrackMetadata) => void;
    pauseTrack: () => void;
    resumeTrack: () => void;
    seek: (newPosition: number) => void;
    duration: number;
    volume: number;
    setVolume: (newVolume: number) => void;
    playPrevTrack: () => void;
    playNextTrack: () => void;
}

const MusicContext = createContext<MusicContextType>({
    tracks: [],
    currentTrack: {
        title: '',
        artist: '',
        album: '',
        pictureUrl: '',
        src: '',
    },
    position: 0,
    paused: true,
    playTrack: () => { },
    pauseTrack: () => { },
    resumeTrack: () => { },
    seek: () => { },
    duration: 0,
    volume: 100,
    setVolume: () => { },
    playPrevTrack: () => { },
    playNextTrack: () => { },
});

export const MusicProvider = ({ children }: { children: ReactNode }) => {
    const music = useMusicInternal();

    return (
        <MusicContext.Provider value={music}>
            {children}
        </MusicContext.Provider>
    );
};

export const useMusic = () => {
    const context = useContext(MusicContext);
    if (context === undefined) {
        throw new Error('useSharedMusic must be used within a MusicProvider');
    }
    return context;
};
