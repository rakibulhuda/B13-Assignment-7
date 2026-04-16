import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import { TimelineProvider } from './context/TimelineContext.jsx';

export default function App() {
    return (
        <BrowserRouter>
            <TimelineProvider>
                <div className="flex flex-col min-h-screen">
                    <Navbar />
                </div>
                <Toaster position="top-right" />
            </TimelineProvider>
        </BrowserRouter>
    );
}
