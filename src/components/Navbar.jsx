import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Clock, BarChart2, Menu, X } from 'lucide-react';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const navItems = [
        { to: '/', label: 'Home', icon: Home },
        { to: '/timeline', label: 'Timeline', icon: Clock },
        { to: '/stats', label: 'Stats', icon: BarChart2 },
    ];

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="w-full px-6 sm:px-10 lg:px-16">
                <div className="flex items-center justify-between h-14">

                    {/* Logo */}
                    <NavLink to="/" className="flex items-center" onClick={() => setMenuOpen(false)}>
                        <img
                            src="/logo.png"
                            alt="KeenKeeper"
                            className="h-5 object-contain"
                            style={{ imageRendering: 'auto', background: 'transparent' }}
                        />
                    </NavLink>

                    {/* Desktop Nav links — hidden on mobile */}
                    <div className="hidden sm:flex items-center gap-1">
                        {navItems.map(({ to, label, icon: Icon }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={to === '/'}
                                className={({ isActive }) =>
                                    `flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
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

                    {/* Hamburger button — only on mobile */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="sm:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="sm:hidden bg-white border-t border-gray-100 px-6 py-3 flex flex-col gap-1">
                    {navItems.map(({ to, label, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === '/'}
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                    isActive
                                        ? 'bg-primary text-white'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`
                            }
                        >
                            <Icon size={16} strokeWidth={1.8} />
                            <span>{label}</span>
                        </NavLink>
                    ))}
                </div>
            )}
        </nav>
    );
}