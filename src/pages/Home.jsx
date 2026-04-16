import { useState, useEffect } from 'react';
import { UserPlus, Users, AlertCircle, Clock, CheckCircle, X } from 'lucide-react';

export default function Home() {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);

    console.log("HOME")
    useEffect(() => {
        setTimeout(() => {
            fetch('./friends.json')
                .then(r => r.json())
                .then(data => { setFriends(data); setLoading(false); });
        },);
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
            <section className=" border-b border-gray-100">
                <div className="w-full px-6 sm:px-10 lg:px-16 py-10">
                    <div className="text-center">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                            <span className="text-primary">Friends</span> to keep close in your life
                        </h1>
                        <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto mb-6">
                            Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
                        </p>
                        <button

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
                                <div key={label} className="bg-white rounded-xl p-5 border border-gray-100 shadow-md text-center">
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

        </div>
    );
}
