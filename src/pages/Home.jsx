import { useState, useEffect } from 'react';
import { UserPlus, Users, AlertCircle, Clock, CheckCircle, X, Search, ChevronDown } from 'lucide-react';
import FriendCard from '../components/FriendCard';

export default function Home() {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('newest');
    const [sortOpen, setSortOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            fetch('/friends.json')
                .then(r => r.json())
                .then(data => { setFriends(data); setLoading(false); });
        }, 800);
    }, []);

    const overdue = friends.filter(f => f.status === 'overdue').length;
    const almostDue = friends.filter(f => f.status === 'almost-due').length;
    const onTrack = friends.filter(f => f.status === 'on-track').length;

    const summaryCards = [
        { label: 'Total Friends', value: friends.length, icon: Users, iconColor: 'text-primary' },
        { label: 'Overdue', value: overdue, icon: AlertCircle, iconColor: 'text-red-500' },
        { label: 'Almost Due', value: almostDue, icon: Clock, iconColor: 'text-amber-500' },
        { label: 'On Track', value: onTrack, icon: CheckCircle, iconColor: 'text-emerald-500' },
    ];

    const sortOptions = [
        { value: 'newest', label: 'Newest Contact' },
        { value: 'oldest', label: 'Oldest Contact' },
        { value: 'name-az', label: 'Name A–Z' },
        { value: 'name-za', label: 'Name Z–A' },
    ];

    const filteredFriends = friends
        .filter(f => {
            const q = search.toLowerCase();
            return (
                f.name.toLowerCase().includes(q) ||
                f.tags.some(t => t.toLowerCase().includes(q)) ||
                f.status.toLowerCase().includes(q)
            );
        })
        .sort((a, b) => {
            if (sort === 'newest') return a.days_since_contact - b.days_since_contact;
            if (sort === 'oldest') return b.days_since_contact - a.days_since_contact;
            if (sort === 'name-az') return a.name.localeCompare(b.name);
            if (sort === 'name-za') return b.name.localeCompare(a.name);
            return 0;
        });

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#f8fafc' }}>
            {/* Banner */}
            <section className="border-b border-gray-100">
                <div className="w-full px-6 sm:px-10 lg:px-16 py-10">
                    <div className="text-center">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                            <span className="text-primary">Friends</span> to keep close in your life
                        </h1>
                        <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto mb-6">
                            Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
                        </p>
                        <button
                            onClick={() => setShowModal(true)}
                            className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors"
                        >
                            <UserPlus size={15} />
                            Add a Friend
                        </button>
                    </div>

                    {/* Summary Cards */}
                    {!loading && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
                            {summaryCards.map(({ label, value, icon: Icon, iconColor }) => (
                                <div key={label} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm text-center">
                                    <div className={`${iconColor} flex justify-center mb-2`}>
                                        <Icon size={20} />
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                                    <p className="text-xs text-gray-500 mt-1">{label}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Friends Section */}
            <section className="w-full px-6 sm:px-10 lg:px-16 py-10">

                {/* Section Header — Title + Search + Sort */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Your Friends</h2>

                    {!loading && (
                        <div className="flex items-center gap-2">
                            {/* Search Bar */}
                            <div className="relative">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by name or tag..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    className="pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 w-48 sm:w-56 transition-all"
                                />
                                {search && (
                                    <button
                                        onClick={() => setSearch('')}
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
                                    >
                                        <X size={13} />
                                    </button>
                                )}
                            </div>

                            {/* Sort Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setSortOpen(!sortOpen)}
                                    className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-600 hover:border-gray-300 transition-colors whitespace-nowrap"
                                >
                                    <span>{sortOptions.find(o => o.value === sort)?.label}</span>
                                    <ChevronDown size={14} className={`transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {sortOpen && (
                                    <>
                                        {/* Backdrop to close */}
                                        <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />
                                        <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                                            {sortOptions.map(option => (
                                                <button
                                                    key={option.value}
                                                    onClick={() => { setSort(option.value); setSortOpen(false); }}
                                                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                                                        sort === option.value
                                                            ? 'bg-primary text-white'
                                                            : 'text-gray-700 hover:bg-gray-50'
                                                    }`}
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                        <p className="text-gray-400 text-sm">Loading your friends...</p>
                    </div>
                ) : filteredFriends.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                            <Search size={22} className="text-gray-300" />
                        </div>
                        <p className="text-gray-600 font-medium text-sm">No friends found</p>
                        <p className="text-gray-400 text-xs mt-1">Try a different name or tag</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredFriends.map(friend => (
                            <FriendCard key={friend.id} friend={friend} />
                        ))}
                    </div>
                )}
            </section>

            {/* Add Friend Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-gray-900">Add a Friend</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={18} />
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">
                            This feature is coming soon! For now, edit <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">public/friends.json</code> to add friends.
                        </p>
                        <button onClick={() => setShowModal(false)} className="w-full bg-primary text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors">
                            Got it
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}