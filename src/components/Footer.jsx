export default function Footer() {
    return (
        <footer className="bg-primary text-white mt-auto">
            <div className="w-full px-6 sm:px-10 lg:px-16 py-12">
                {/* Center content */}
                <div className="flex flex-col items-center text-center mb-8">
                    <img src="/logo-xl.png" alt="KeenKeeper" className="h-12 object-contain mb-3" />
                    <p className="text-green-200 text-sm max-w-sm leading-relaxed">
                        Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
                    </p>

                    <div className="mt-7">
                        <p className="text-sm font-semibold text-white mb-4">Social Links</p>
                        <div className="flex items-center gap-3 justify-center">
                            <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:opacity-90 transition-opacity">
                                <img src="/instagram.png" alt="Instagram" className="w-20 h-20 object-contain" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:opacity-90 transition-opacity">
                                <img src="/facebook.png" alt="Facebook" className="w-20 h-20 object-contain" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:opacity-90 transition-opacity">
                                <img src="/twitter.png" alt="Twitter" className="w-20 h-20 object-contain" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-green-700 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-green-300">
                    <span>© 2026 KeenKeeper. All rights reserved.</span>
                    <div className="flex items-center gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
