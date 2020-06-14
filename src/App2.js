import React, { useEffect, useMemo, useCallback, useState } from 'react';

const ITEM_HEIGHT = 20;
const CONTAINER_HEIGHT = 300;
const EMPTY_ARRAY = [];

export const App2 = () => {
    const [items, setItems] = useState(0);

    useEffect(() => {
        setItems(50);
    }, []);

    const onScrollHandler = useCallback((event) => {
        const hiddenItems = Math.ceil(
            (event.currentTarget.scrollTop / ITEM_HEIGHT) + (CONTAINER_HEIGHT / ITEM_HEIGHT));
        if (hiddenItems >= items) {
            setItems(items + 50);
        }

    }, [items, setItems]);

    const components = [];
    for (let i = 0; i < items; i++) {
        const style = {
            height: `${ITEM_HEIGHT}px`,
            position: "absolute",
            top: `${i * ITEM_HEIGHT}px`,
        };
        components.push(<li key={i} style={style} >{i}</li>)
    }

    return (
        <div
            style={{ overflowY: "scroll", height: `${CONTAINER_HEIGHT}px` }}
            onScroll={onScrollHandler}>
            <ul style={{ position: "relative" }}>
                {components}
            </ul>
        </div>
    );
};

