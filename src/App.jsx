import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import FriendDetail from './pages/FriendDetail';
import { TimelineProvider } from './context/TimelineContext';

export default function App() {
    return (
        <BrowserRouter>
            <TimelineProvider>
                <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <main className="flex-1">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/friend/:id" element={<FriendDetail />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
                <Toaster position="top-right" />
            </TimelineProvider>
        </BrowserRouter>
    );
}
