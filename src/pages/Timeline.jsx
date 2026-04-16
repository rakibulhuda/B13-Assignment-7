import { useState } from 'react';
import { ChevronDown, Clock } from 'lucide-react';
import { useTimeline } from '../context/TimelineContext';

const TYPE_ICONS = {
    Call: '/call.png',
    Text: '/text.png',
    Video: '/video.png',
};

function EntryIcon({ type }) {
    const src = TYPE_ICONS[type];
    if (!src) return <span className="text-2xl w-9 h-9 flex items-center justify-center">🤝</span>;
    return <img src={src} alt={type} className="w-9 h-9 object-contain opacity-75" />;
}

function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

const FILTERS = ['All', 'Call', 'Text', 'Video'];

export default function Timeline() {
    const { entries } = useTimeline();
    const [filter, setFilter] = useState('All');
    const [open, setOpen] = useState(false);

    const filtered = filter === 'All' ? entries : entries.filter(e => e.type === filter);

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#f8fafc' }}>
            <div className="w-full px-6 sm:px-10 lg:px-16 py-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Timeline</h1>

                {/* Filter Dropdown */}
                <div className="relative mb-6 inline-block w-56">
                    <button
                        onClick={() => setOpen(!open)}
                        className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-500 hover:border-gray-300 transition-colors"
                    >
                        <span>{filter === 'All' ? 'Filter timeline' : `Filtered: ${filter}`}</span>
                        <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
                    </button>
                    {open && (
                        <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                            {FILTERS.map(f => (
                                <button
                                    key={f}
                                    onClick={() => { setFilter(f); setOpen(false); }}
                                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${filter === f ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Empty State */}
                {filtered.length === 0 ? (
                    <div className="bg-white rounded-xl border border-gray-100 flex flex-col items-center justify-center py-20 px-6 text-center">
                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                            <Clock size={28} className="text-gray-300" />
                        </div>
                        <h3 className="text-base font-semibold text-gray-700 mb-1">No records found</h3>
                        <p className="text-sm text-gray-400 max-w-xs">
                            Your timeline is looking a bit empty. Go to a friend's page and log a Call, Text, or Video to get started.
                        </p>
                    </div>
                ) : (
                    /* Timeline Entries */
                    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden divide-y divide-gray-100">
                        {filtered.map(entry => (
                            <div key={entry.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                                <EntryIcon type={entry.type} />
                                <div>
                                    <p className="text-sm text-gray-900">
                                        <span className="font-semibold">{entry.type}</span>
                                        {' '}
                                        <span className="text-gray-500">with {entry.friendName}</span>
                                    </p>
                                    <p className="text-xs text-gray-400 mt-0.5">{formatDate(entry.date)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
