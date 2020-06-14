import React, { useCallback, useState } from 'react';

import { List } from './List';

export const DataList = () => {
    const [count, setCount] = useState(100);
    const renderItem = useCallback((idx) => {
        if (idx === count - 1) {
            setCount(count + 100);
        }
        return <div>{idx}</div>;
    }, [count, setCount]);

    return (<List totalItems={count} itemHeight={20} height={300} renderItem={renderItem} />);
};