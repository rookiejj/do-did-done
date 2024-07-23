import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

import Login from "./components/Login";
import Logout from "./components/Logout";
import DailyActivityTracker from "./components/DailyActivityTracker";

import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { GithubCustomTheme } from "./util/supabase-custom-theme";
import Header from "./components/Header";
import Account from "./pages/Account";
import Button from "./components/Button";
import NotFound from "./pages/NotFound";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function App() {
  const navigation = useNavigate();

  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleMyPageNavigation = () => {
    const data = { key: session.user.id, session: session };
    navigation("/mypage", { state: data });
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
          <div className="login">
            <Auth
              supabaseClient={supabase}
              appearance={GithubCustomTheme}
              providers={["github"]}
              onlyThirdPartyProviders={true}
            />
          </div>
        )}
      </div>

      <Routes>
        <Route path="/" element={<DailyActivityTracker />} />
        <Route path="/mypage" element={<Account />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
