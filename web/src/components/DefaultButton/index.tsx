import { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './styles.module.scss'

interface DefaultButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { 
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