import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import TodoList from "./pages/TodoList";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import TodoForm from "./pages/TodoForm";
import logoTodo from "./assets/logo-todo.png";

import { logout, getProfile } from "./api/Todo.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const response = await getProfile();
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log("Sessão não encontrada ou expirada:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkUserSession();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setIsAuthenticated(false);
      navigate("/");
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 font-medium">Carregando...</p>
      </div>
    );
  }

  return (
    <Routes>

      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/todos" replace /> : <LandingPage />
        }
      />
      <Route
        path="/*"
        element={
          <div className="min-h-screen bg-gray-50 p-6">
            <header className="max-w-3xl mx-auto mb-8">
              <nav className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">
                  <Link to={isAuthenticated ? "/todos" : "/"}>
                    <img src={logoTodo} alt="Logo ToDo" className="h-20 w-auto" />
                  </Link>
                </h1>

                <div className="flex items-center gap-4">
                  {isAuthenticated && (
                    <>
                      <Link
                        to="/todos"
                        className="text-sm font-medium text-gray-600 hover:text-gray-900"
                      >
                        Tarefas
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors cursor-pointer"
                      >
                        Sair
                      </button>
                    </>
                  )}
                </div>
              </nav>
            </header>

            <main className="max-w-3xl mx-auto">
              <Routes>
                <Route
                  path="todos"
                  element={
                    isAuthenticated ? <TodoList /> : <Navigate to="/login" replace />
                  }
                />
                <Route
                  path="new"
                  element={
                    isAuthenticated ? <TodoForm /> : <Navigate to="/login" replace />
                  }
                />
                <Route
                  path="login"
                  element={
                    isAuthenticated ? (
                      <Navigate to="/todos" replace />
                    ) : (
                      <Login onLoginSuccess={() => {
                        setIsAuthenticated(true);
                        navigate("/todos");
                      }} />
                    )
                  }
                />
                <Route
                  path="register"
                  element={
                    isAuthenticated ? (
                      <Navigate to="/todos" replace />
                    ) : (
                      <Register onRegisterSuccess={() => {
                        alert("Conta criada com sucesso!");
                        navigate("/login");
                      }} />
                    )
                  }
                />

                <Route
                  path="forgot"
                  element={
                    isAuthenticated ? (
                      <Navigate to="/todos" replace />
                    ) : (
                      <ForgotPassword onForgotPassword={() => {
                        alert("Email enviado com sucesso!");
                        navigate("/login");
                      }} />
                    )
                  }
                />
                <Route
                  path="reset-password"
                  element={
                    isAuthenticated ? (
                      <Navigate to="/todos" replace />
                    ) : (
                      <ResetPassword onResetSuccess={() => {
                        alert("Senha atualizada!");
                        navigate("/login");
                      }} />
                    )
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