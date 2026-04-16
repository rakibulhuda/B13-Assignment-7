import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6" style={{ backgroundColor: '#f8fafc' }}>
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6">
                <AlertTriangle size={36} className="text-red-400" />
            </div>
            <h1 className="text-6xl font-bold text-gray-200 mb-2">404</h1>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Page Not Found</h2>
            <p className="text-gray-500 text-sm max-w-sm mb-8 leading-relaxed">
                Looks like you've followed a broken link or entered a URL that doesn't exist on this site.
            </p>
            <div className="flex items-center gap-3">
                <button
                    onClick={() => navigate(-1)}
                    className="border border-gray-200 text-gray-600 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                    Go Back
                </button>
                <button
                    onClick={() => navigate('/')}
                    className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors"
                >
                    Go Home
                </button>
            </div>
        </div>
    );
}
