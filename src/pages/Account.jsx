import "./Account.css";
import { useState, useEffect } from "react";
import { supabase } from "../App";
import { useLocation } from "react-router-dom";

export default function Account() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  const location = useLocation();
  const session = location.state.session;

  useEffect(() => {
    let ignore = false;
    async function getProfile() {
      setLoading(true);
      const { user } = session;

      const { data, error } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (data) {
          setUsername(data.username);
          setWebsite(data.website);
          setAvatarUrl(data.avatar_url);
        }
      }

      setLoading(false);
    }

    getProfile();

    return () => {
      ignore = true;
    };
  }, [session]);

  async function updateProfile(event, avatarUrl) {
    event.preventDefault();

    setLoading(true);
    const { user } = session;

    const updates = {
      id: user.id,
      username,
      website,
      avatar_url: avatarUrl,
      updated_at: new Date(),
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      alert(error.message);
    } else {
      setAvatarUrl(avatarUrl);
    }
    setLoading(false);
  }

  return (
    <div className="toss-account-container">
      <h1 className="toss-title">계정 정보</h1>
      <form onSubmit={updateProfile} className="toss-form">
        <div className="toss-form-group">
          <label htmlFor="email" className="toss-label">
            이메일
          </label>
          <input
            id="email"
            type="text"
            value={session.user.email}
            disabled
            className="toss-input toss-input-disabled"
          />
        </div>
        <div className="toss-form-group">
          <label htmlFor="username" className="toss-label">
            이름
          </label>
          <input
            id="username"
            type="text"
            required
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
            className="toss-input"
          />
        </div>
        <div className="toss-form-group">
          <label htmlFor="website" className="toss-label">
            웹사이트
          </label>
          <input
            id="website"
            type="url"
            value={website || ""}
            onChange={(e) => setWebsite(e.target.value)}
            className="toss-input"
          />
        </div>

        <button className="toss-button" type="submit" disabled={loading}>
          {loading ? "업데이트 중..." : "정보 업데이트"}
        </button>
      </form>
    </div>
  );
}
