import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  isPasskeyAuthed: boolean;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | Error | null }>;
  signInWithPasskey: (key: string) => boolean;
  signOut: () => Promise<void>;
  isConfigured: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPasskeyAuthed, setIsPasskeyAuthed] = useState<boolean>(() => {
    return localStorage.getItem('portfolio_admin_passkey_auth') === 'true';
  });

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    // Fetch initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    }).catch((err) => {
      console.error('Error fetching Supabase session:', err);
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      return { 
        error: new Error('Supabase is not configured yet. Please provide your VITE_SUPABASE_ANON_KEY in .env.') 
      };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error };
      }

      setUser(data.user);
      setSession(data.session);
      setIsPasskeyAuthed(true);
      localStorage.setItem('portfolio_admin_passkey_auth', 'true');
      return { error: null };
    } catch (err: any) {
      return { error: err };
    }
  };

  const signInWithPasskey = (key: string): boolean => {
    const cleanKey = key.trim().toLowerCase();
    const validKeys = [
      'prtf.mrb182',
      'prft.mrb182',
      'prtf-mrb182',
      'prft-mrb182',
      'prtf_mrb182',
      'prft_mrb182',
      '8888',
      'admin',
      'root',
      'luxury2025',
    ];
    if (validKeys.includes(cleanKey)) {
      setIsPasskeyAuthed(true);
      localStorage.setItem('portfolio_admin_passkey_auth', 'true');
      return true;
    }
    return false;
  };

  const signOut = async () => {
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        // ignore
      }
    }
    setUser(null);
    setSession(null);
    setIsPasskeyAuthed(false);
    localStorage.removeItem('portfolio_admin_passkey_auth');
  };

  const isAdmin = Boolean(user) || isPasskeyAuthed;

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isAdmin,
        isPasskeyAuthed,
        signIn,
        signInWithPasskey,
        signOut,
        isConfigured: isSupabaseConfigured,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
