import { ReactNode, ReactText } from 'react'
import styles from './styles.module.scss'

interface TagProps {
  children: ReactNode
}

export function Tag({children}: TagProps) {
  return (
    <span className={styles.tag}>
      {children}
    </span>
  )
}