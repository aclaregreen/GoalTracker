import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Index() {
  const [initialRoute, setInitialRoute] = useState<"/Start" | "/Home" | null>(
    null
  );

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setInitialRoute("/Home");
        const user = data.session.user;
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        await supabase.from("profiles").upsert({
          id: user.id,
          timezone,
        });
      } else {
        setInitialRoute("/Start");
      }
      supabase.auth.onAuthStateChange((_event, session) => {
        setInitialRoute(session ? "/Home" : "/Start");
      });
    };

    checkSession();
  }, []);

  if (!initialRoute) return null;

  return <Redirect href={initialRoute} />;
}
