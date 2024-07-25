import { supabase } from "../App";

export async function checkUserProvider() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    // identities 배열에서 마지막으로 사용된 제공자 확인
    const lastUsedProvider =
      user.identities?.[user.identities.length - 1]?.provider;

    console.log("Last used provider:", lastUsedProvider);

    // 모든 연결된 제공자 확인
    const allProviders = user.identities?.map((identity) => identity.provider);

    console.log("All connected providers:", allProviders);

    return { lastUsedProvider, allProviders };
  } else {
    console.log("No user is currently logged in");
    return null;
  }
}
