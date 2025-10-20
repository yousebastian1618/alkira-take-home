import style from './FormFooter.module.scss';
import Link from "next/link";

export default function FormFooter(
  { pageTitle }: { pageTitle: string}
) {
  let formFooter;
  if (pageTitle === 'LOGIN') {
    formFooter = (
      <div className={style.formFooterContainer}>
        <Link className={style.link} href='/forgot-password'>Forgot Password</Link>
        <span className={style.formFooterElement}>
          Don&apos;t have an account?&nbsp;
          <Link className={style.link} href='/signup'>Sign Up</Link>
        </span>
      </div>
    )
  } else if (pageTitle === 'SIGNUP') {
    formFooter = (
      <div className={style.formFooterContainer}>
        <span className={style.formFooterElement}>
          Already have an account?&nbsp;go to&nbsp;
          <Link className={style.link} href='/login'>Login</Link>
        </span>
      </div>
    )
  } else if (pageTitle === 'FORGOT PASSWORD' || pageTitle === 'RESET PASSWORD' || pageTitle === 'MFA') {
    formFooter = (
      <div className={style.formFooterContainer}>
        <span className={style.formFooterElement}>
          Back to&nbsp;
          <Link className={style.link} href='/login'>Login</Link>
        </span>
      </div>
    )
  } else (
    formFooter = (<></>)
  )
  return formFooter;
}