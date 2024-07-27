import React, { useEffect, useState } from "react";
import { supabase } from "../App";
import { Navigate } from "react-router-dom";

const SupabaseAuthHandler = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        setIsAuthenticated(false);
      }
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT" || event === "USER_DELETED") {
          setIsAuthenticated(false);
        } else if (event === "SIGNED_IN" && session) {
          setIsAuthenticated(true);
        }
      }
    );

    return () => {
      if (authListener && authListener.unsubscribe) {
        authListener.unsubscribe();
      }
    };
  }, []);

  if (!isAuthenticated) {
    return (
      //   <div>
      //     <h2>세션이 만료되었습니다. 다시 로그인해 주세요.</h2>
      //     <button onClick={() => supabase.auth.signIn()}>로그인</button>
      //   </div>
      <Navigate to="/login" replace />
    );
  }

  return <>{children}</>;
};

export default SupabaseAuthHandler;
