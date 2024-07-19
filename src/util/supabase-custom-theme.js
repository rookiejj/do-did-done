import { ThemeSupa } from "@supabase/auth-ui-shared";

export const GithubCustomTheme = {
  theme: ThemeSupa,
  variables: {
    default: {
      colors: {
        brand: "red",
        brandAccent: "darkred",
      },
      radii: {
        borderRadiusButton: "10px",
      },
    },
  },
  style: {
    button: {
      border: "2px solid lightgray",
      fontWeight: "bold",
      google: {
        backgroundColor: "#4285F4",
        color: "white",
      },
      facebook: {
        backgroundColor: "#3b5998",
        color: "white",
      },
      twitter: {
        backgroundColor: "#1DA1F2",
        color: "white",
      },
    },
    anchor: {
      color: "blue",
      textDecoration: "underline",
    },
  },
};

export const darkTheme = {
  theme: ThemeSupa,
  variables: {
    default: {
      colors: {
        brand: "lightblue",
        brandAccent: "skyblue",
        defaultButtonBackground: "#333",
        defaultButtonBackgroundHover: "#555",
      },
    },
  },
};
