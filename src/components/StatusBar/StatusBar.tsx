'use client'
import style from "./StatusBar.module.scss";
import {useStatusStore} from "@/stores/statusStore";

export default function StatusBar() {

  const status = useStatusStore((state) => state.status);
  const statusTitle = useStatusStore((state) => state.statusTitle);
  const statusMessage = useStatusStore((state) => state.statusMessage);
  const clearStatus = useStatusStore((state) => state.clearStatus);

  function closeStatusBar() {
    clearStatus();
  }

  return (
    <div className={style.statusBarContainer}
         style={{
           backgroundColor: status === 'error' ? 'var(--default-red-color)' : 'var(--default-green-color)',
           color: status === 'error' ? 'white' : 'black'
         }}
         onClick={() => closeStatusBar()}
    >
      <div className={style.closeContainer} onClick={() => closeStatusBar()}>
        <span className={style.closeButton}>x</span>
      </div>
      <h3 className={style.statusBarTitle}>{statusTitle}</h3>
      <div className={style.statusBarMessasge}>
        <span>{statusMessage}</span>
      </div>
    </div>
  )
}