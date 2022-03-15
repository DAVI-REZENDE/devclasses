import { Tag } from '../Tag'
import { FaPlay } from 'react-icons/fa'
import styles from './styles.module.scss'

interface ClassCardProps {
  id: string,
  title: string,
  duration: string,
}

export function ClassCard({id, title, duration}: ClassCardProps) {

  const durationInMinutes = Math.floor((Number(duration) / 1000) / 60)

  return (
    <article className={styles.card}>
      <strong>{title}</strong>
      <Tag>{ durationInMinutes } minuto{durationInMinutes > 1 && 's'}</Tag>
      <FaPlay className={styles.play} />
    </article>
  )
}