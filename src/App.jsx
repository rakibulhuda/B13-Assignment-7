import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { TimelineProvider } from './context/TimelineContext.jsx';

export default function App() {
    return (
        <BrowserRouter>
            <TimelineProvider>
                <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <main className="flex-1">
                        <Routes>
                            <Route path="/" element={<Home />} />
                        </Routes>
                    </main>
                </div>
                <Toaster position="top-right" />
            </TimelineProvider>
        </BrowserRouter>
    );
}
