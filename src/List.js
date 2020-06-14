import React, { useCallback, useState } from 'react';

export const List = ({ totalItems, itemHeight, height: containerHeight, renderItem }) => {
    const [scrollTop, setScrollTop] = useState(0);

    const onScrollHandler = useCallback((event) => {
        setScrollTop(event.currentTarget.scrollTop);
    }, [setScrollTop]);

    // fake we have a lots of item, so that the scroll bar will always show up
    const fullHeight = totalItems * itemHeight;
    const buffer = Math.ceil(containerHeight / itemHeight);
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
    const end = Math.min(
        totalItems - 1,
        Math.floor((scrollTop + containerHeight) / itemHeight) + buffer);

    const itemsToBeRender = [];
    for (let i = start; i <= end; i++) {
        const style = {
            height: `${itemHeight}px`,
            position: "absolute",
            top: `${i * itemHeight}px`,
        };
        itemsToBeRender.push(<div style={style}>{renderItem(i)}</div>);
    }

    return (
        <div
            style={{ overflowY: "scroll", height: `${containerHeight}px` }}
            onScroll={onScrollHandler}>
            <div
                style={{ height: `${fullHeight}px`, position: "relative" }}
            >
                {itemsToBeRender}
            </div>
        </div>
    );
};
