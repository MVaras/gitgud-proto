import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message); else alert('Revisa tu email para confirmar registro');
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Gitgud - Acceso</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input 
          type="email" placeholder="Email" className="w-full p-2 mb-4 border rounded"
          value={email} onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" placeholder="Contraseña" className="w-full p-2 mb-4 border rounded"
          value={password} onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex gap-2">
          <button onClick={handleLogin} disabled={loading} className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            {loading ? '...' : 'Entrar'}
          </button>
          <button onClick={handleSignUp} disabled={loading} className="flex-1 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300">
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
}
