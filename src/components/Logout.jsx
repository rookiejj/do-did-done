import { supabase } from "../App";
import Button from "./Button";
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
        <Button onClick={handleLogout} title={"Log Out"} />
      </div>
    </>
  );
};

export default Logout;
