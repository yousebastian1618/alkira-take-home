"use client";
import React, { createContext, useContext, useMemo } from "react";
import type { Button, ButtonAction } from "@/types/utils";
import { BUTTON_ACTIONS } from "@/actions/buttonAction";
import { useRouter } from "next/navigation";

type clickCtx = {
  invoke: (button: Button) => void;
};

const ClickContext = createContext<clickCtx | null>(null);

type Props = {
  children: React.ReactNode;
  actions?: Record<string, ButtonAction>
}

export default function ClickProvider(
  { children, actions = BUTTON_ACTIONS}: Props
) {
  const router = useRouter();
  const value = useMemo<clickCtx>(() => {
    const navigate = (href: string, opts?: { replace?: boolean }) =>
      opts?.replace ? router.replace(href) : router.push(href);
    const invoke: clickCtx['invoke'] = (button) => {
      const key = button['function'];
      const func = actions[key]
      if (!func) {
        console.warn(`No Action registered for function ${key}`);
        return;
      }
      void func({ button, navigate });
    };
    return { invoke };
  }, [actions, router]);
  return <ClickContext.Provider value={value}>{children}</ClickContext.Provider>
}

export function useClicks() {
  const ctx = useContext(ClickContext);
  if (!ctx) throw new Error("useClicks must be used within <ClicksProvider>");
  return ctx;
}