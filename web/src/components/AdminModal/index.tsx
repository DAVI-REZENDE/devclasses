import { useSession } from 'next-auth/react';
import Modal from 'react-modal';
import { api } from '../../services/api';

import styles from './styles.module.scss'

Modal.setAppElement('#__next');

interface LoginModalProps {
  modalIsOpen: boolean
  setModalIsOpen: (boolen) => void
}

export function AdminModal({modalIsOpen, setModalIsOpen}: LoginModalProps) {
  const { data: session } = useSession()

  function closeModal() {
    setModalIsOpen(false)
  }

  async function handleCreateUserAdmin() {
    const response = await api.post('user_admin', {email: session.user.email})

    closeModal()

    console.log(response)
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={{
        overlay: {
          background: 'rgba(0,0,0,0.2)',
          backdropFilter: 'blur(5px)'
        },
        content: {
          background: '#13111B',
          border: 0,
          borderRadius: 10,
          maxWidth: 420,
          margin: '0 auto',
          maxHeight: 220
        }
      }}
      over
      contentLabel="Example Modal"
    >
      <div className={styles.content}>
        <div>
          <strong>Para criar modulos você presisa de um login adiministrativo.</strong>
          <span>Você deseja tornar seu login como administrativo?</span>
        </div>

        <div className={styles.buttons}>
          <button onClick={handleCreateUserAdmin} className={styles.yes}>Sim</button>
          <button onClick={closeModal} className={styles.no}>Não</button>
        </div>
      </div>
    </Modal>
  )
}