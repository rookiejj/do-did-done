import { useState, useEffect } from "react";
import "./App.css";

import Login from "./components/Login";
import Logout from "./components/Logout";
import DailyActivityTracker from "./components/DailyActivityTracker";

import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { GithubCustomTheme } from "./util/supabase-custom-theme";
import Header from "./components/Header";
import Account from "./components/Account";
import Button from "./components/Button";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function App() {
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

  return (
    <div className="App">
      <Header title={"Do Did Done"} />
      <div className="Auth">
        {!session ? (
          <div className="login">
            <Auth
              supabaseClient={supabase}
              appearance={GithubCustomTheme}
              providers={["github"]}
              onlyThirdPartyProviders={true}
            />
          </div>
        ) : (
          <div>
            <div className="main_menu">
              <Button title={"My Page"} />
              <div className="logout">
                <Logout />
              </div>
            </div>
            <div className="daily_activity_tracker">
              <DailyActivityTracker />
            </div>
            {/* <Account key={session.user.id} session={session} /> */}
          </div>
        )}
      </div>
    </div>
  );

  if (!session) {
    return (
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={["github"]}
        onlyThirdPartyProviders={true}
      />
    );
  } else {
    return (
      <>
        <Logout />
      </>
    );
  }

  console.log(session);
  if (session) {
    return (
      <>
        <Logout />
      </>
    );
  } else {
    return (
      <>
        <div>
          <Login></Login>
          <button />
          <DailyActivityTracker />
        </div>
      </>
    );
  }
}

export default App;
