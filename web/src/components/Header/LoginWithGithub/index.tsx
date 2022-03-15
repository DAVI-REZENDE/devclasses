import { FaGithub } from "react-icons/fa";
import { signIn, signOut, useSession } from 'next-auth/react'

import styles from './styles.module.scss'

export function LoginWithGithub() {
  const { data: session } = useSession()

  console.log(session);

  if(session) {
    return (
      <button onClick={() => signOut()} className={styles.buttonLogged} type="button">
        <img src={session.user.image} alt={session.user.name} />
        {session.user.name}
      </button>
    )
  } else {
    return (
      <button onClick={() => signIn('github')} className={styles.button} type="button">
        <FaGithub size={24} />
        Faça login com o Github
      </button>
    )
  }
  
}