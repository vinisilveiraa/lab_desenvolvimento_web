import {
  Routes,
  Route,
  Link,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage.jsx";
import DoacoesList from "./pages/DoacoesList.jsx";

function App() {

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingPage />
        }
      />

      <Route
        path="/*"
        element={
          <div className="min-h-screen bg-gray-50 p-6">
            <header className="max-w-3xl mx-auto mb-8">
              <nav className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">
                  <Link to="/">
                    Gerenciador de Doacoes
                  </Link>
                </h1>

                <div className="flex items-center gap-4">
                  <Link
                    to="/doacoes"
                    className="text-sm font-medium text-gray-600 hover:text-gray-900"
                  >
                    Doações
                  </Link>
                </div>
              </nav>
            </header>

            <main className="max-w-3xl mx-auto">
              <Routes>
                <Route
                  path="doacoes"
                  element={
                    <DoacoesList />
                  }
                />
                <Route
                  path="/"
                  element={
                    <LandingPage />
                  }
                />
              </Routes>
            </main>
          </div>
        }
      />
    </Routes>
  );
}

export default App;