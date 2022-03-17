import { Tag } from '../Tag'
import { FaPlay } from 'react-icons/fa'
import styles from './styles.module.scss'
import { FiEdit } from 'react-icons/fi'
import { useState } from 'react'
import { AlertModal } from '../AlertModal'
import { ModalWithInput } from '../ModalWithInput'
import { api } from '../../services/api'
import { useRouter } from 'next/router'

interface ClassCardProps {
  id: string,
  title: string,
  duration: string,
  isAdmin: boolean,
  streamDate: string,
  module: string
}

export function ClassCard({
  id, 
  title, 
  duration, 
  isAdmin,
  streamDate,
  module
}: ClassCardProps) {

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const router = useRouter()

  const durationInMinutes = Math.floor((Number(duration) / 1000) / 6)

  async function handleOpenEditClassModal() {
    setModalIsOpen(true)
  }

  async function updateClass(newName: string) {
    const data = {
      id, 
      name: newName, 
      duration,
      stream_date: streamDate,
      module,
      module_name: module
    }

    
    const response = await api.put('classes', {...data}).then(res => res.data).catch(err => console.log(err))
    console.log(response)
    router.reload()
  }

  return (
    <article className={styles.card}>
      <strong>{title}</strong>
      <Tag>{ durationInMinutes } minuto{durationInMinutes > 1 && 's'}</Tag>
      <FaPlay className={styles.play} />

      {isAdmin && (
        <button onClick={handleOpenEditClassModal} className={styles.editButton}>
          <FiEdit />
        </button>
      )}

      <ModalWithInput 
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        onClick={updateClass}
        modalType='update'
      />
    </article>
  )
}