import { supabase } from "../App";

const Login = () => {
  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: "http://localhost:5173/",
        },
      });

      if (error) throw error;

      console.log("Login successful:", data);
      // 로그인 성공 후 처리 (예: 리디렉션)
    } catch (error) {
      console.error("Error during login:", error.message);
      // 에러 처리 (예: 사용자에게 알림)
    }
  };

  return (
    <>
      <div>
        <h1>Supabase Auth</h1>
        <button onClick={handleLogin}>Sign in with GibHub</button>
      </div>
    </>
  );
};

export default Login;
