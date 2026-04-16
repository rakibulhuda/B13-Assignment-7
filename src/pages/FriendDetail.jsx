import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Bell, Archive, Trash2, Edit2, Phone, MessageSquare, Video } from 'lucide-react';
import toast from 'react-hot-toast';
import StatusBadge from '../components/StatusBadge';
import TagBadge from '../components/TagBadge';
import { useTimeline } from '../context/TimelineContext';

export default function FriendDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addEntry } = useTimeline();
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

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
    );

    if (!friend) return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-slate-50">
            <p className="text-gray-500">Friend not found.</p>
            <button onClick={() => navigate('/')} className="text-primary underline text-sm">Go Home</button>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* --- LEFT COLUMN (Profile & Actions) --- */}
                <div className="lg:col-span-4 flex flex-col gap-4">

                    {/* Profile Card */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-center text-center shadow-sm">
                        <img
                            src={friend.picture}
                            alt={friend.name}
                            className="w-20 h-20 rounded-full object-cover mb-3 ring-2 ring-gray-100"
                            onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.name)}&background=1C4A3B&color=fff`; }}
                        />

                        <h2 className="text-lg font-bold text-gray-900">{friend.name}</h2>

                        <div className="flex flex-wrap justify-center gap-2 mt-2 mb-3">
                            <StatusBadge status={friend.status} />
                            {friend.tags.map(tag => <TagBadge key={tag} tag={tag} />)}
                        </div>

                        <p className="text-sm text-gray-500 italic mb-1 line-clamp-2">"{friend.bio}"</p>
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Preferred: email</p>
                    </div>

                    {/* Action Buttons Stack */}
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

                {/* --- RIGHT COLUMN (Stats & Details) --- */}
                <div className="lg:col-span-8 flex flex-col gap-4">

                    {/* Top Stats Row - Concise Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col items-center justify-center shadow-sm">
                            <span className="text-2xl font-bold text-gray-900">{friend.days_since_contact}</span>
                            <span className="text-xs text-gray-500 font-medium mt-1">Days Since Contact</span>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col items-center justify-center shadow-sm">
                            <span className="text-2xl font-bold text-gray-900">{goal}</span>
                            <span className="text-xs text-gray-500 font-medium mt-1">Goal (Days)</span>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col items-center justify-center shadow-sm">
                            <span className="text-lg font-bold text-gray-900 leading-tight text-center">{formatDate(friend.next_due_date)}</span>
                            <span className="text-xs text-gray-500 font-medium mt-1">Next Due</span>
                        </div>
                    </div>

                    {/* Relationship Goal Section */}
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
                                Connect every <span className="font-bold text-gray-900 text-base">{goal} days</span>
                            </p>
                        )}
                    </div>


                    {/* Quick Check-In Section */}
                    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                        <h3 className="text-base font-semibold text-gray-900 mb-3">Quick Check-In</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { type: 'Call', Icon: Phone },
                                { type: 'Text', Icon: MessageSquare },
                                { type: 'Video', Icon: Video },
                            ].map(({ type, Icon }) => (
                                <button
                                    key={type}
                                    onClick={() => handleCheckin(type)}
                                    className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg border border-gray-200 bg-gray-50 hover:bg-white hover:border-primary/30 hover:shadow-sm transition-all group"
                                >
                                    <div className="p-2 rounded-full bg-white border border-gray-100 shadow-sm group-hover:border-primary/20 group-hover:text-primary transition-colors">
                                        {/* Use the Lucide Icon component directly here */}
                                        <Icon size={20} className="text-gray-600 group-hover:text-primary" />
                                    </div>
                                    <span className="text-xs font-medium text-gray-700">{type}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
