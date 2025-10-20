import {User} from "@/types/user";
import style from './UserDetail.module.scss';

type Props = {
  user: User | null;
}

export default function UserDetail({ user }: Props) {
  const userKeys: (keyof User)[] = ['email', 'firstName', 'lastName', 'role'];

  return (
    <div className={style.userDetailContainer}>
      {userKeys.map((key) => (
        <div key={key}>
          <b>{key}</b>: {user?.[key] ?? "—"}
        </div>
      ))}
    </div>
  )
}