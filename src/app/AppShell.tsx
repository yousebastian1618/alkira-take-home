'use client'
import "./globals.css";
import React from "react";
import ClickProvider from "@/providers/clickProvider";
import style from "@/app/app.module.scss";
import {useStatusStore} from "@/stores/statusStore";

export default function AppShell({ children }: Readonly<{ children: React.ReactNode; }>) {
  const loading = useStatusStore((state) => state.loading);

  return (
    <ClickProvider>
      <div className={loading ? style.disabledOpacity : ''}>
        {children}
      </div>
    </ClickProvider>
  );
}
