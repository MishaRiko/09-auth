'use client';

import { useEffect } from 'react';
import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useAuthStore(s => s.setUser);
  const clearIsAuthenticated = useAuthStore(s => s.clearIsAuthenticated);

  useEffect(() => {
    const init = async () => {
      try {
        const isAuth = await checkSession();
        if (isAuth) {
          const user = await getMe();
          setUser(user);
        } else {
          clearIsAuthenticated();
        }
      } catch {
        clearIsAuthenticated();
      }
    };
    init();
  }, [setUser, clearIsAuthenticated]);

  return <>{children}</>;
}
