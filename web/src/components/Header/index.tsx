import Link from 'next/link'
import { LoginWithGithub } from './LoginWithGithub';

import styles from './styles.module.scss'

export function Header() {

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link href="/">
          <img src="/images/logo.svg" alt="devclasses" />
        </Link>

        <LoginWithGithub />
      </div>
    </header>
  )
}