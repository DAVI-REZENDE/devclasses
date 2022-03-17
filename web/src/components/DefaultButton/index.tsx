import { ButtonHTMLAttributes, HTMLProps, ReactNode } from 'react'
import styles from './styles.module.scss'

type DefaultButtonProps = HTMLProps<HTMLButtonElement> & { 
  children: ReactNode,
  full?: boolean,
  dark?: boolean,
}

export function DefaultButton({
  children,
  full,
  dark,
  ...rest
}: DefaultButtonProps) {
  return (
    <button {...rest} className={`${styles.button} ${full && styles.full} ${dark && styles.dark}`}>
      {children}
    </button>
  )
}