import { supabase } from "../App";

const Logout = () => {
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <>
      <div>
        <h1>Supabase Auth</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
};

export default Logout;
