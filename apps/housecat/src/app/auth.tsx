"use client";

import { usePathname, useRouter } from "next/navigation";
import { fetchLoggedInToHousecat, housecatLogout } from "@wprdc/api";
import { A, Button, getCookie } from "@wprdc/ui";
import { useEffect, useState } from "react";
import { UserProfile } from "@wprdc/types";

const openPaths = [
  "/",
  "/accounts/login",
  "/accounts/request",
  "/about",
  "/submitted",
];

export function AuthCheck() {
  const [loggedIn, setLoggedIn] = useState<UserProfile>();
  const pathName = usePathname();
  const router = useRouter();

  const token = getCookie("hct") ?? "";
  const csrftoken = getCookie("csrftoken") ?? "";

  useEffect(() => {
    // ignore check for certain pages
    if (!openPaths.includes(pathName) && !loggedIn) {
      fetchLoggedInToHousecat(token).then((user) => {
        if (!user.user) {
          router.push("/accounts/login");
        } else {
          setLoggedIn(user);
        }
      });
    }
  }, [pathName]);

  async function handleLogout() {
    setLoggedIn(undefined);
    await housecatLogout(token, csrftoken);
    router.push("/");
  }

  return (
    <div className="flex justify-end border-b border-black py-0.5 pr-8">
      {loggedIn ? (
        <div className="flex items-center justify-center gap-2 text-sm">
          <div>Logged in as</div> <div>{loggedIn.user.email}</div>
          <Button
            variant="borderless"
            className="ml-4 text-sm underline"
            onPress={handleLogout}
          >
            Log Out
          </Button>
        </div>
      ) : (
        <A href="/accounts/login" className="text-sm">
          Login
        </A>
      )}
    </div>
  );
}
