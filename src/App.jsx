import { useState, useEffect } from "react";
import "./App.css";

import Login from "./components/Login";
import Logout from "./components/Logout";
import DailyActivityTracker from "./components/DailyActivityTracker";

import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

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

  if (!session) {
    return (
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={["github", "google"]}
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
          {/* <DailyActivityTracker /> */}
        </div>
      </>
    );
  }
}

export default App;
