import { useTheme } from '@mui/material';
import { useState, useEffect } from 'react';

const useScreenSize = () => {
    const theme = useTheme();
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > theme.breakpoints.values.md);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > theme.breakpoints.values.md);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [theme.breakpoints.values.md]);

    return { isDesktop };
};

export default useScreenSize;