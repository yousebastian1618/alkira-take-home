'use client';
import style from "./homepage.module.css";
import ButtonComponent from "@/components/Button/Button";
import {healthCheckButton, homePageLoginButton, homePageLogoutButton} from "@/objects/buttons";
import {useUserStore} from "@/stores/userStore";
import UserDetail from "@/app/_components/UserDetail";

export default function HomePage() {
  const user = useUserStore((state) => state.user);
  const isLoggedIn = useUserStore((state) => state.user !== null);

  return (
    <div className={style.homePageContainer}>
      <h2 className={style.homePageTitle}>Home Page</h2>
      <div className={style.homePageStateContainer}>
        <div className={style.homePageState}>
          {isLoggedIn ?
            <UserDetail user={user} /> :
            <div>
              <h3>Logged Out</h3>
              <br/>
              <div>Click <b>{`'Login'`}</b> button below.</div>
              <div>Click <b>{`'Health Check'`}</b> to check API call</div>
            </div>
          }
        </div>
      </div>
      <div className={style.buttonContainer}>
        {isLoggedIn ?
          <ButtonComponent button={homePageLogoutButton} /> :
          <ButtonComponent button={homePageLoginButton} />
        }
        <ButtonComponent button={healthCheckButton} />
      </div>
    </div>
  )
}