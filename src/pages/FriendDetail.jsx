import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Bell, Archive, Trash2, Edit2, Phone, MessageSquare, Video, History } from 'lucide-react';
import toast from 'react-hot-toast';
import StatusBadge from '../components/StatusBadge';
import TagBadge from '../components/TagBadge';
import { useTimeline } from '../context/TimelineContext';

export default function FriendDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addEntry, entries } = useTimeline();
    const [friend, setFriend] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editGoal, setEditGoal] = useState(false);
    const [goal, setGoal] = useState(null);

    useEffect(() => {
        fetch('/friends.json')
            .then(r => r.json())
            .then(data => {
                const found = data.find(f => f.id === parseInt(id));
                setFriend(found);
                setGoal(found?.goal);
                setLoading(false);
            });
    }, [id]);

    const handleCheckin = (type) => {
        if (!friend) return;
        addEntry(type, friend.name);
        const icons = { Call: '📞', Text: '💬', Video: '🎥' };
        toast.success(`${type} with ${friend.name} logged!`, {
            icon: icons[type],
            style: { borderRadius: '10px', fontFamily: 'DM Sans, sans-serif', fontSize: '14px' },
        });
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A';
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    // Filter timeline entries for THIS friend only
    const friendEntries = friend
        ? entries.filter(e => e.friendName === friend.name)
        : [];

    const callCount  = friendEntries.filter(e => e.type === 'Call').length;
    const textCount  = friendEntries.filter(e => e.type === 'Text').length;
    const videoCount = friendEntries.filter(e => e.type === 'Video').length;

    const typeIcon = {
        Call:  <Phone size={14} className="text-emerald-600" />,
        Text:  <MessageSquare size={14} className="text-purple-500" />,
        Video: <Video size={14} className="text-sky-500" />,
    };

    const typeBg = {
        Call:  'bg-emerald-50 border-emerald-100',
        Text:  'bg-purple-50 border-purple-100',
        Video: 'bg-sky-50 border-sky-100',
    };

    const typeLabel = {
        Call:  'text-emerald-700',
        Text:  'text-purple-700',
        Video: 'text-sky-700',
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#f8fafc' }}>
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
    );

    if (!friend) return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4" style={{ backgroundColor: '#f8fafc' }}>
            <p className="text-gray-500">Friend not found.</p>
            <button onClick={() => navigate('/')} className="text-primary underline text-sm">Go Home</button>
        </div>
    );

    return (
        <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-10" style={{ backgroundColor: '#f8fafc' }}>
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:items-start">

                {/* ── LEFT COLUMN ── sticky so it stays level with right */}
                <div className="lg:col-span-4 flex flex-col gap-4 lg:sticky lg:top-20 lg:self-start">

                    {/* Profile Card */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-center text-center shadow-sm">
                        <img
                            src={friend.picture}
                            alt={friend.name}
                            className="w-20 h-20 rounded-full object-cover mb-3 ring-2 ring-gray-100"
                            onError={e => {
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.name)}&background=1C4A3B&color=fff`;
                            }}
                        />
                        <h2 className="text-lg font-bold text-gray-900">{friend.name}</h2>
                        <div className="flex flex-wrap justify-center gap-2 mt-2 mb-3">
                            <StatusBadge status={friend.status} />
                            {friend.tags.map(tag => <TagBadge key={tag} tag={tag} />)}
                        </div>
                        <p className="text-sm text-gray-500 italic mb-1 line-clamp-3">"{friend.bio}"</p>
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mt-1">
                            Preferred: email
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                        <button className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100">
                            <Bell size={15} className="text-gray-400" />
                            Snooze 2 Weeks
                        </button>
                        <button className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100">
                            <Archive size={15} className="text-gray-400" />
                            Archive
                        </button>
                        <button
                            onClick={() => { toast.error(`${friend.name} deleted`); navigate('/'); }}
                            className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                        >
                            <Trash2 size={15} />
                            Delete
                        </button>
                    </div>
                </div>

                {/* ── RIGHT COLUMN ── */}
                <div className="lg:col-span-8 flex flex-col gap-4">

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col items-center justify-center shadow-sm">
                            <span className="text-2xl font-bold text-gray-900">{friend.days_since_contact}</span>
                            <span className="text-xs text-gray-500 font-medium mt-1 text-center">Days Since Contact</span>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col items-center justify-center shadow-sm">
                            <span className="text-2xl font-bold text-gray-900">{goal}</span>
                            <span className="text-xs text-gray-500 font-medium mt-1 text-center">Goal (Days)</span>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col items-center justify-center shadow-sm">
                            <span className="text-base font-bold text-gray-900 leading-tight text-center">
                                {formatDate(friend.next_due_date)}
                            </span>
                            <span className="text-xs text-gray-500 font-medium mt-1 text-center">Next Due</span>
                        </div>
                    </div>

                    {/* Relationship Goal */}
                    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-base font-semibold text-gray-900">Relationship Goal</h3>
                            <button
                                onClick={() => setEditGoal(!editGoal)}
                                className="text-xs font-medium text-gray-500 bg-gray-50 hover:bg-gray-100 px-2 py-1 rounded border border-gray-200 transition-colors flex items-center gap-1"
                            >
                                <Edit2 size={12} />
                                Edit
                            </button>
                        </div>
                        {editGoal ? (
                            <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg border border-gray-200">
                                <span className="text-sm text-gray-600">Connect every</span>
                                <input
                                    type="number"
                                    value={goal}
                                    onChange={e => setGoal(Number(e.target.value))}
                                    className="w-14 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                />
                                <span className="text-sm text-gray-600">days</span>
                                <button
                                    onClick={() => setEditGoal(false)}
                                    className="ml-auto text-xs bg-primary text-white px-3 py-1.5 rounded hover:bg-primary-dark transition-colors"
                                >
                                    Save
                                </button>
                            </div>
                        ) : (
                            <p className="text-gray-600 text-sm">
                                Connect every{' '}
                                <span className="font-bold text-gray-900 text-base">{goal} days</span>
                            </p>
                        )}
                    </div>

                    {/* Quick Check-In */}
                    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                        <h3 className="text-base font-semibold text-gray-900 mb-3">Quick Check-In</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { type: 'Call',  Icon: Phone },
                                { type: 'Text',  Icon: MessageSquare },
                                { type: 'Video', Icon: Video },
                            ].map(({ type, Icon }) => (
                                <button
                                    key={type}
                                    onClick={() => handleCheckin(type)}
                                    className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg border border-gray-200 bg-gray-50 hover:bg-white hover:border-primary/30 hover:shadow-sm transition-all group"
                                >
                                    <div className="p-2 rounded-full bg-white border border-gray-100 shadow-sm group-hover:border-primary/20 transition-colors">
                                        <Icon size={20} className="text-gray-600 group-hover:text-primary" />
                                    </div>
                                    <span className="text-xs font-medium text-gray-700">{type}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Recent Interaction History */}
                    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <History size={16} className="text-gray-400" />
                            <h3 className="text-base font-semibold text-gray-900">Recent Interaction History</h3>
                            {friendEntries.length > 0 && (
                                <span className="ml-auto text-xs text-gray-400 font-medium">
                                    {friendEntries.length} total
                                </span>
                            )}
                        </div>

                        {friendEntries.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-8 text-center">
                                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                                    <History size={20} className="text-gray-300" />
                                </div>
                                <p className="text-sm font-medium text-gray-500">No interactions yet</p>
                                <p className="text-xs text-gray-400 mt-1">
                                    Use Quick Check-In above to log a Call, Text, or Video
                                </p>
                            </div>
                        ) : (
                            <>
                                {/* Summary count badges */}
                                <div className="grid grid-cols-3 gap-3 mb-4">
                                    {[
                                        { type: 'Call',  count: callCount },
                                        { type: 'Text',  count: textCount },
                                        { type: 'Video', count: videoCount },
                                    ].map(({ type, count }) => (
                                        <div
                                            key={type}
                                            className={`flex items-center justify-between px-3 py-2.5 rounded-lg border ${typeBg[type]}`}
                                        >
                                            <div className="flex items-center gap-1.5">
                                                {typeIcon[type]}
                                                <span className={`text-xs font-semibold ${typeLabel[type]}`}>{type}</span>
                                            </div>
                                            <span className={`text-sm font-bold ${typeLabel[type]}`}>{count}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Recent entries — latest 5 */}
                                <div className="divide-y divide-gray-100">
                                    {friendEntries.slice(0, 5).map(entry => (
                                        <div key={entry.id} className="flex items-center gap-3 py-2.5">
                                            <div className={`w-7 h-7 rounded-full flex items-center justify-center border ${typeBg[entry.type]}`}>
                                                {typeIcon[entry.type]}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-800">{entry.type}</p>
                                                <p className="text-xs text-gray-400">{formatDate(entry.date)}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {friendEntries.length > 5 && (
                                        <p className="text-xs text-gray-400 pt-2.5 text-center">
                                            +{friendEntries.length - 5} more — view all on the Timeline page
                                        </p>
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}