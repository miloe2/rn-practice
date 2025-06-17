import React, { ReactNode } from 'react';
import useAuth from '@/hooks/queries/useAuth';
import { router, useFocusEffect } from 'expo-router';
interface AuthRouteProps {
  children: ReactNode;
}

const AuthRoute = ({ children }: AuthRouteProps) => {
  const { auth } = useAuth();
  useFocusEffect(() => {
    !auth.id && router.replace('/auth');
  });

  if (!auth.id) return null;

  return <>{children}</>;
};

export default AuthRoute;
