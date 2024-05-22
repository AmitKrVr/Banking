"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import TopBarProgress from 'react-topbar-progress-indicator';

TopBarProgress.config({
    barColors: {
        "0": "#0179FE",
        "1.0": "#0179FE"
    },
    shadowBlur: 5
});

const ProgressBarHandler = () => {
    const pathname = usePathname();
    const [progress, setProgress] = useState(false);

    useEffect(() => {
        setProgress(true);

        const timer = setTimeout(() => {
            setProgress(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [pathname]);

    return progress ? <TopBarProgress /> : null;
};

export default ProgressBarHandler;
