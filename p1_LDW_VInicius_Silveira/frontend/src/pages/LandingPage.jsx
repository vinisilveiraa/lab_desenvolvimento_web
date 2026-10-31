import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-between p-6">

            <header className="max-w-4xl mx-auto w-full mb-8">
                <nav className="flex items-center justify-between py-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <Link to="/">
                            Gestão de Doações
                        </Link>
                        <span className="hidden sm:inline-block text-xs font-semibold text-gray-500 uppercase tracking-wider border-l border-gray-300 pl-3">
                            Gerenciamento de doações instituicional
                        </span>
                    </div>
                </nav>
            </header>
            <main className="max-w-4xl mx-auto w-full my-auto py-6 text-center">
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
                    Gerencie as doações da instituição.
                </h1>

                <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                    Controle total de doações recebidas e distribuidas, simples e rápido.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
                    <Link
                        to="/doacoes"
                        className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors text-center"
                    >
                        Abrir
                    </Link>
                </div>
            </main>


            <footer className="max-w-4xl mx-auto w-full pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
                © {new Date().getFullYear()} Doações. Todos os direitos reservados.
            </footer>
        </div>
    );
}