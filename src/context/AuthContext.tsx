import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { AuthError, Session, User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  authError: string | null;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | Error | null }>;
  signOut: () => Promise<void>;
  isConfigured: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function asError(value: unknown): Error {
  return value instanceof Error ? value : new Error('Authentication could not be verified.');
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const verifySession = useCallback(async (candidate: Session | null) => {
    if (!isSupabaseConfigured || !candidate) {
      setSession(null);
      setUser(null);
      setIsAdmin(false);
      return;
    }

    setSession(candidate);
    setIsAdmin(false);
    try {
      // getUser() verifies the identity with the Auth server; a local session object alone
      // is not treated as proof of administrator authorization.
      const { data: userData, error: userError } = await supabase.auth.getUser(candidate.access_token);
      if (userError || !userData.user) {
        setUser(null);
        setSession(null);
        setIsAdmin(false);
        setAuthError('Your session could not be verified. Please sign in again.');
        return;
      }

      setUser(userData.user);
      const { data: adminResult, error: adminError } = await supabase.rpc('is_portfolio_admin');
      if (adminError) {
        setIsAdmin(false);
        setAuthError('Administrator authorization is unavailable. Apply the reviewed database migration and try again.');
        return;
      }

      setIsAdmin(adminResult === true);
      setAuthError(adminResult === true ? null : 'This account is not authorized to administer the portfolio.');
    } catch (error) {
      setUser(null);
      setIsAdmin(false);
      setAuthError(asError(error).message);
    }
  }, []);

  useEffect(() => {
    let active = true;

    if (!isSupabaseConfigured) {
      setAuthError('Supabase is not configured. Administrator sign-in is unavailable.');
      setLoading(false);
      return;
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      // Defer SDK calls until the auth callback has returned; Supabase warns that nested Auth
      // API calls inside this callback can deadlock. The session is checked with Auth and RLS.
      window.setTimeout(() => {
        void verifySession(nextSession).finally(() => {
          if (active) setLoading(false);
        });
      }, 0);
    });

    void supabase.auth.getSession().then(async ({ data, error }) => {
      if (!active) return;
      if (error) {
        setAuthError('Unable to restore your session. Please sign in again.');
        setIsAdmin(false);
        setUser(null);
        setSession(null);
        return;
      }
      await verifySession(data.session);
    }).catch(() => {
      if (active) {
        setAuthError('Unable to restore your session. Please sign in again.');
        setIsAdmin(false);
        setUser(null);
        setSession(null);
      }
    }).finally(() => {
      if (active) setLoading(false);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [verifySession]);

  const signIn = async (email: string, password: string): Promise<{ error: AuthError | Error | null }> => {
    if (!isSupabaseConfigured) {
      const error = new Error('Supabase is not configured. No insecure local authentication fallback is available.');
      setAuthError(error.message);
      return { error };
    }

    setLoading(true);
    setAuthError(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error || !data.session) {
        setIsAdmin(false);
        setUser(null);
        setSession(null);
        setLoading(false);
        setAuthError(error?.message || 'Sign-in did not create a valid session.');
        return { error: error ?? new Error('Sign-in failed.') };
      }

      await verifySession(data.session);
      // If the database authorization check fails, fail closed and clear this session.
      const { data: authorization, error: authorizationError } = await supabase.rpc('is_portfolio_admin');
      if (authorizationError || authorization !== true) {
        await supabase.auth.signOut({ scope: 'local' });
        setIsAdmin(false);
        setUser(null);
        setSession(null);
        const accessError = new Error(authorizationError
          ? 'Administrator authorization could not be verified. Database security migration may be pending.'
          : 'This account is not authorized to administer the portfolio.');
        setAuthError(accessError.message);
        setLoading(false);
        return { error: accessError };
      }

      setAuthError(null);
      setIsAdmin(true);
      setLoading(false);
      return { error: null };
    } catch (error) {
      const caught = asError(error);
      setAuthError(caught.message);
      setIsAdmin(false);
      setLoading(false);
      return { error: caught };
    }
  };

  const signOut = async (): Promise<void> => {
    setLoading(true);
    try {
      if (isSupabaseConfigured) {
        const { error } = await supabase.auth.signOut({ scope: 'local' });
        if (error) throw error;
      }
      setUser(null);
      setSession(null);
      setIsAdmin(false);
      setAuthError(null);
    } catch (error) {
      // Do not report a successful logout if Supabase could not invalidate the local session.
      setIsAdmin(false);
      setAuthError('Sign-out could not be confirmed. Close this tab and retry sign-out.');
      throw asError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      isAdmin,
      authError,
      signIn,
      signOut,
      isConfigured: isSupabaseConfigured,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
