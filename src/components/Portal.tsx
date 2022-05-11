import React, {useLayoutEffect, useState, useRef} from "react";
import {createPortal} from "react-dom";

interface PortalProps {
    children: React.ReactNode;
    zIndex?: number;
    target?: HTMLElement | string;
}

export const Portal: React.FC<PortalProps> = (props) => {
    const {target, zIndex, children} = props;
    const [mounted, setMounted] = useState(false);
    const ref = useRef<HTMLElement>();

    useLayoutEffect(() => {
        setMounted(true);
        ref.current = !target
            ? document.createElement('div')
            : typeof target === 'string'
                ? document.querySelector(target)
                : target;

        if (!target) {
            document.body.appendChild(ref.current);
        }

        return () => {
            !target && document.body.removeChild(ref.current);
        };

    }, [target]);

    if (!mounted) {
        return null;
    }

    return createPortal(
        <div style={{position: "relative", zIndex}}>
            {children}
        </div>,
        ref.current
    )
}
