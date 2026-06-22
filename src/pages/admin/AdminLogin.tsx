import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const { signIn, session } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Déjà connecté → vers le dashboard.
  if (session) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      navigate('/admin', { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-8 bg-white dark:bg-white/5 rounded-3xl border border-secondary/10 dark:border-white/10 shadow-xl"
      >
        <h1 className="text-2xl font-black text-secondary dark:text-white mb-1">Admin</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Connexion à l'espace de gestion</p>

        <label className="block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 px-4 py-2.5 rounded-xl bg-light-bg dark:bg-dark-bg border border-secondary/10 dark:border-white/10 text-secondary dark:text-white outline-none focus:border-primary/50"
          placeholder="you@email.com"
        />

        <label className="block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-4 px-4 py-2.5 rounded-xl bg-light-bg dark:bg-dark-bg border border-secondary/10 dark:border-white/10 text-secondary dark:text-white outline-none focus:border-primary/50"
          placeholder="••••••••"
        />

        {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-60"
        >
          <LogIn size={18} />
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
