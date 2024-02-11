import React, { useEffect, useRef } from 'react';

interface Props {
    text: string;
}
const Marquee = ({ text }: Props) => {
    const marqueeRef = useRef<HTMLDivElement | null>(null);
    const textRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const marquee = marqueeRef.current;
        const textEl = textRef.current;

        if (marquee && textEl) {
            marquee.scrollLeft = textEl.offsetWidth; // start from the right edge
        }

        const scrollText = () => {
            if (marquee && textEl) {
                if (marquee.scrollLeft >= textEl.offsetWidth) {
                    marquee.scrollLeft = 0;
                } else {
                    marquee.scrollLeft += 1;
                }
            }
        };

        const intervalId = setInterval(scrollText, 20); // adjust speed as needed

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div ref={marqueeRef} style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
            <div ref={textRef} style={{ display: 'inline-block', paddingRight: '100%', marginLeft: '25%' }}>
                {text}
            </div>
            <div style={{ display: 'inline-block' }}>
                {text}
            </div>
        </div>
    );
};

export default Marquee;