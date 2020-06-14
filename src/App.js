import React, { useMemo, useCallback, useState } from 'react';

const ITEM_HEIGHT = 20;
const CONTAINER_HEIGHT = 300;
const BUFFER = Math.ceil(CONTAINER_HEIGHT / ITEM_HEIGHT);

export const App = () => {
  const [scrollTop, setScrollTop] = useState(0);

  const allItems = useMemo(() => {
    const items = [];
    for (let i = 0; i < 200; i++) {
      const style = {
        height: `${ITEM_HEIGHT}px`,
        position: "absolute",
        top: `${i * ITEM_HEIGHT}px`,
      };
      items.push(<li key={i} style={style} >{i}</li>)
    }
    return items;
  }, [ITEM_HEIGHT]);

  const onScrollHandler = useCallback((event) => {
    setScrollTop(event.currentTarget.scrollTop);
  }, [allItems, setScrollTop]);

  // fake we have a lots of item, so that the scroll bar will always show up
  const fullHeight = allItems.length * ITEM_HEIGHT;
  const start = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER);
  const end = Math.min(
    allItems.length - 1,
    Math.floor((scrollTop + CONTAINER_HEIGHT) / ITEM_HEIGHT) + BUFFER);

  const itemsToBeRender = allItems.slice(start, end + 1);

  return (
    <div
      style={{ overflowY: "scroll", height: `${CONTAINER_HEIGHT}px` }}
      onScroll={onScrollHandler}>
      <ul
        style={{ height: `${fullHeight}px`, position: "relative" }}
      >
        {itemsToBeRender}
      </ul>
    </div>
  );
};
