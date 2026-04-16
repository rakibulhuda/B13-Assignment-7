import { createContext, useContext, useState } from 'react';

const TimelineContext = createContext(null);

// Start EMPTY — entries only added via Call/Text/Video buttons
export function TimelineProvider({ children }) {
    const [entries, setEntries] = useState([]);

    const addEntry = (type, friendName) => {
        const today = new Date().toISOString().split('T')[0];
        const newEntry = {
            id: 't' + Date.now(),
            type,
            friendName,
            date: today,
        };
        setEntries(prev => [newEntry, ...prev]);
    };

    return (
        <TimelineContext.Provider value={{ entries, addEntry }}>
            {children}
        </TimelineContext.Provider>
    );
}

export function useTimeline() {
    return useContext(TimelineContext);
}
