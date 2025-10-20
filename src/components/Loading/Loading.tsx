'use client';
import Image from "next/image";
import style from "./Loading.module.scss";
import {useStatusStore} from "@/stores/statusStore";

export default function Loading() {
  const loading = useStatusStore((state) => state.loading);
  if (loading) {
    return (
      <div className={style.loadingContainer}>
        <Image
          src="/loading.gif"
          alt="Loading"
          priority
          draggable={false}
          width={40}
          height={40}
        />
        <br/>
        <div>Loading ...</div>
      </div>
    )
  }
  return (<></>)

}