'use client'
import React from 'react';
import style from './auth.module.scss';
import {useStatusStore} from "@/stores/statusStore";

export default function AuthLayout({ children }: Readonly<{
  children: React.ReactNode
}>) {
  const loading = useStatusStore((state) => state.loading);

  return (
    <main className={style.authLayoutContainer}>
      <div className={loading ? style.disabledOpacity : style.children}>
        {children}
      </div>
    </main>
  )
}