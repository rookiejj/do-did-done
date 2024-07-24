import { useState, useEffect, createContext } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import "./App.css";

import Login from "./components/Login";
import Logout from "./components/Logout";
import DailyActivityTracker from "./components/DailyActivityTracker";

import { createClient } from "@supabase/supabase-js";
import Header from "./components/Header";
import Account from "./pages/Account";
import Button from "./components/Button";
import NotFound from "./pages/NotFound";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const SessionContext = createContext();

function App() {
  const navigation = useNavigate();

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleMyPageNavigation = () => {
    const data = { key: session.user.id, session: session };
    navigation("/mypage", { state: data });
  };

  // Protected Route 컴포넌트
  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return <div>로딩 중...</div>; // 또는 로딩 스피너 컴포넌트
    }
    if (!session) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <div className="App">
      <Header title={"Do Did Done"} />
      <div>
        {session ? (
          <div className="main_menu">
            <Button title={"My Page"} onClick={handleMyPageNavigation} />
            <div className="logout">
              <Logout />
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <SessionContext.Provider value={session}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DailyActivityTracker />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/mypage"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SessionContext.Provider>
    </div>
  );
}

export default App;
