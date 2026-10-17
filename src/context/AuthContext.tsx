import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | Error | null }>;
  signOut: () => Promise<void>;
  updatePassword: (newPassword: string) => Promise<{ error: AuthError | Error | null }>;
  isConfigured: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Proactively purge any obsolete client-side bypass flags from prior versions
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('portfolio_admin_passkey_auth');
        localStorage.removeItem('portfolio_admin_custom_passcode');
        localStorage.removeItem('supabase_publishable_key');
        localStorage.removeItem('supabase_anon_key');
      } catch {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    // Server-verified session initialization
    supabase.auth
      .getSession()
      .then(({ data: { session }, error }) => {
        if (!isMounted) return;
        if (error) {
          console.warn('Supabase session fetch notice:', error.message);
          setSession(null);
          setUser(null);
        } else {
          setSession(session);
          setUser(session?.user ?? null);
        }
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error('Unexpected error fetching Supabase session:', err);
        setSession(null);
        setUser(null);
        setLoading(false);
      });

    // Listen to cryptographically validated server-side auth state events
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!isMounted) return;
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(
    async (email: string, password: string): Promise<{ error: AuthError | Error | null }> => {
      if (!isSupabaseConfigured) {
        return {
          error: new Error(
            'Supabase is not configured yet. Please configure VITE_SUPABASE_ANON_KEY in your environment variables.'
          ),
        };
      }

      const cleanEmail = email.trim();
      if (!cleanEmail || !password) {
        return { error: new Error('Please enter both email and password.') };
      }

      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

        if (error) {
          return { error };
        }

        setUser(data.user);
        setSession(data.session);
        return { error: null };
      } catch (err: any) {
        return { error: err instanceof Error ? err : new Error(String(err)) };
      }
    },
    []
  );

  const signOut = useCallback(async () => {
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Sign out notice:', e);
      }
    }
    setUser(null);
    setSession(null);
  }, []);

  const updatePassword = useCallback(
    async (newPassword: string): Promise<{ error: AuthError | Error | null }> => {
      if (!isSupabaseConfigured) {
        return { error: new Error('Supabase is not configured.') };
      }
      if (!session || !user) {
        return { error: new Error('Active authenticated session required.') };
      }
      if (!newPassword || newPassword.length < 8) {
        return { error: new Error('Password must be at least 8 characters long.') };
      }

      try {
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        if (error) {
          return { error };
        }
        return { error: null };
      } catch (err: any) {
        return { error: err instanceof Error ? err : new Error(String(err)) };
      }
    },
    [session, user]
  );

  // Administrative authority is strictly granted ONLY when a valid server-verified Supabase session exists
  const isAdmin = Boolean(user && session);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isAdmin,
        signIn,
        signOut,
        updatePassword,
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
