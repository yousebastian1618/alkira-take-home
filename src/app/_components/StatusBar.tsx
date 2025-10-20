'use client'
import StatusBar from "@/components/StatusBar/StatusBar";
import {useStatusStore} from "@/stores/statusStore";

export default function StatusBarPage() {
  const statusShowing = useStatusStore((state) => state.statusShowing);
  return (
    <div>
      {statusShowing ?
        <StatusBar /> : <></>
      }
    </div>
  )
}