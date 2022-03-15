import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Tag } from '../Tag'
import styles from './styles.module.scss'

interface ModuleCardProps {
  id: string,
  title: string,
  classes: number,
  durationModule: number[],
  createdByUser: string
}

export function ModuleCard({
  title,
  classes,
  durationModule,
  id,
  createdByUser
}: ModuleCardProps) {

  const [totalDurationInMinutes, setTotalDurationInMinutes] = useState(0)

  useEffect(() => {
    let allDurations = 0
    durationModule.forEach(duration => allDurations += duration)

    setTotalDurationInMinutes(Math.floor((allDurations / 1000) / 60))
  }, [])

  return (
    <Link href={`/modules/${id}/${createdByUser}`} prefetch >
      <div className={styles.card}>
        <strong>{title}</strong>
        <Tag>{classes} aula{classes > 1 && 's'}</Tag>
        <Tag>{totalDurationInMinutes} minutos</Tag>
      </div>
    </Link>
  )
}