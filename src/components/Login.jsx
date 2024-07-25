import "./Login.css";
import { supabase } from "../App";
import { Auth } from "@supabase/auth-ui-react";
import { GithubCustomTheme } from "../util/supabase-custom-theme";

const Login = () => {
  return (
    <div className="Login">
      <Auth
        supabaseClient={supabase}
        appearance={GithubCustomTheme}
        providers={["github", "google"]}
        onlyThirdPartyProviders={true}
      />
    </div>
  );
};

export default Login;
