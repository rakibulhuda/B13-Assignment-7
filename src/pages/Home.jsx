import { useState, useEffect } from 'react';
import { UserPlus, Users, AlertCircle, Clock, CheckCircle, X } from 'lucide-react';
import FriendCard from '../components/FriendCard';

export default function Home() {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

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

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#f8fafc' }}>
            {/* Banner */}
            <section className="bg-white border-b border-gray-100">
                <div className="w-full px-6 sm:px-10 lg:px-16 py-10">
                    <div className="text-center">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                            Keep Your <span className="text-primary">Friendships</span> Alive
                        </h1>
                        <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto mb-6">
                            Track, nurture, and celebrate the relationships that matter most to you.
                        </p>
                        <button
                            onClick={() => setShowModal(true)}
                            className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded text-sm font-semibold hover:bg-primary-dark transition-colors"
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
                <h2 className="text-xl font-bold text-gray-900 mb-6">Your Friends</h2>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                        <p className="text-gray-400 text-sm">Loading your friends...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {friends.map(friend => (
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
