import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import TagBadge from './TagBadge';

export default function FriendCard({ friend }) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/friend/${friend.id}`)}
            className="bg-white rounded-xl p-5 cursor-pointer hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 border border-gray-100"
        >
            <div className="flex flex-col items-center text-center gap-2">
                <img
                    src={friend.picture}
                    alt={friend.name}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-100"
                    onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.name)}&background=1C4A3B&color=fff`; }}
                />
                <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{friend.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{friend.days_since_contact}d ago</p>
                </div>
                <div className="flex flex-wrap justify-center gap-1">
                    {friend.tags.map(tag => <TagBadge key={tag} tag={tag} />)}
                </div>
                <StatusBadge status={friend.status} />
            </div>
        </div>
    );
}
