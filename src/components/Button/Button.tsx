'use client';
import {Button} from "@/types/utils";
import React, { useState } from 'react';
import style from './Button.module.css';
import {useClicks} from "@/providers/clickProvider";


type Props = {
  button: Button;
};

export default function ButtonComponent({ button }: Props) {
  const { invoke } = useClicks();
  const [hovering, setHovering] = useState(false);

  function handleClick(){
    invoke(button);
  }

  return (
    <button
      className={style['modified-button']}
      onClick={() => handleClick()}
      type="button"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{ backgroundColor: hovering ? button.hoveringColor :  button.color }}
    >
      {button.label}
    </button>
  )
}