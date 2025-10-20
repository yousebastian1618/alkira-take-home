'use client';
import HomePage from "@/app/(home)/page";
import {User} from "@/types/user";
import {useUserStore} from "@/stores/userStore";
import {useEffect} from "react";

type Props = {
  user: User | null
}

export default function HomeClient({ user }: Props) {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  return (
    <>
      <header></header>
      <div role="main">
        <HomePage></HomePage>
      </div>
      <footer></footer>
    </>
  );
}
