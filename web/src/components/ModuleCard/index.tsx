import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { api } from '../../services/api'
import { ModalWithInput } from '../ModalWithInput'
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
  const { data: session } = useSession()
  const router = useRouter()

  const [totalDurationInMinutes, setTotalDurationInMinutes] = useState(0)
  const [isAdmin, setIsAdmin] = useState(false)

  const [modalIsOpen, setModalIsOpen] = useState(false)

  useEffect(() => {
    let allDurations = 0
    durationModule.forEach(duration => {
      allDurations = allDurations + duration
    })
    
    setTotalDurationInMinutes(Math.floor((allDurations / 1000) / 6))
    
    setIsAdmin(createdByUser === session?.user.email)
  }, [session])

  function openModal() {
    setModalIsOpen(true)
  }

  async function updateModule(newName: string) {
    const data = {
      module: title,
      new_name: newName
    }

    try {
      await api.put('modules', data).then(res => res.data)
      router.reload() 
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
      <div className={styles.card}>
        {isAdmin && (
            <button onClick={openModal} className={styles.editButton}>
              <FiEdit />
            </button>
        )}

        <Link href={`/modules/${id}/${createdByUser}`} prefetch >
          <strong>
            {title}
          </strong>
        </Link>

        <Tag>{classes} aula{classes > 1 && 's'}</Tag>
        <Tag>{totalDurationInMinutes} minutos</Tag>

        <ModalWithInput
          onClick={updateModule}
          modalType={'update'}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen} 
        />
      </div>
  )
}