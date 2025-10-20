import {Button, FormInput} from "@/types/utils";
import style from "./AuthShell.module.scss"
import Image from "next/image";
import FormComponent from "@/components/Form/Form";
import ButtonComponent from "@/components/Button/Button";
import FormFooter from "@/app/(auth)/_components/FormFooter";
import Link from "next/link";

type AuthShellProps = {
  pageTitle: string;
  image: string;
  form: FormInput[];
  buttons: Button[];
}

export default function AuthShell(
  { pageTitle, image, form, buttons }: AuthShellProps
) {
  return (
    <div className={style.container}>
      <div className={style.authContainer}>
        <div className={style.imageContainer}>
          <Image
            src={image}
            alt={pageTitle}
            priority
            fill
            draggable={false}
          />
        </div>
        <div className={style.formContainer}>
          <Link href="/" className={style.logoContainerWrapper}>
            <div className={style.logoContainer}>
              <Image className={style.logoStyle}
                     src="/logos/logo2.png"
                     alt="alkira-logo"
                     priority
                     fill
                     draggable={false}
              />
            </div>
          </Link>
          <h3>{pageTitle}</h3>
          <div className={style.authFormContainer}>
            <FormComponent form={form} formName={pageTitle} buttons={buttons}/>
            <FormFooter pageTitle={pageTitle} />
          </div>
          <div className={style.authButtonsWrapper}>
            <div className={style.authButtonsContainer}>
              {buttons.map((button: Button) => (
                <ButtonComponent key={button.name} button={button} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}