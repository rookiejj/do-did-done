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
import { checkUserProvider } from "./util/check-user-provider";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const SessionContext = createContext();

function App() {
  const navigation = useNavigate();

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [social, setSocial] = useState(null);

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

      checkUserProvider().then((result) => {
        if (result) {
          // 여기서 UI를 업데이트하거나 다른 작업을 수행
          setSocial(`logged in ${result.lastUsedProvider}`);
        }
      });
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
      {session ? (
        <div
          style={{
            textAlign: "right",
            marginBottom: "10px",
            fontSize: "10px",
            marginRight: "5px",
            color: "gray",
          }}
        >
          {social}
        </div>
      ) : (
        <div></div>
      )}
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
