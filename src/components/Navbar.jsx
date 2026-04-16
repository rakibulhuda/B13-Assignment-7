import { NavLink } from 'react-router-dom';
import { Home, Clock, BarChart2 } from 'lucide-react';

export default function Navbar() {
    const navItems = [
        { to: '/', label: 'Home', icon: Home },
        { to: '/timeline', label: 'Timeline', icon: Clock },
        { to: '/stats', label: 'Stats', icon: BarChart2 },
    ];

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="w-full px-6 sm:px-10 lg:px-16">
                <div className="flex items-center justify-between h-14">
                    {/* Logo — plain text exactly like Figma */}
                    <NavLink to="/" className="flex items-center">
                        <img src="/logo.png" alt="KeenKeeper" className="h-50 object-contain" style={{ imageRendering: 'auto', background: 'transparent' }} />
                    </NavLink>

                    {/* Nav links */}
                    <div className="flex items-center gap-1">
                        {navItems.map(({ to, label, icon: Icon }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={to === '/'}
                                className={({ isActive }) =>
                                    `flex items-center gap-1.5 px-4 py-1.5 rounded text-sm font-medium transition-all duration-200 ${
                                        isActive
                                            ? 'bg-primary text-white'
                                            : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                                    }`
                                }
                            >
                                <Icon size={14} strokeWidth={1.8} />
                                <span>{label}</span>
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}
