import { supabase } from "../App";
import "./Logout.css";

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
      <div className="Logout">
        <button className="button" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </>
  );
};

export default Logout;
