import { v4 as uuidv4 } from 'uuid';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import Modal from 'react-modal';
import { api } from '../../services/api';

import styles from './styles.module.scss'
import { useRouter } from 'next/router';

Modal.setAppElement('#__next');

interface LoginModalProps {
  modalIsOpen: boolean
  setModalIsOpen: (boolen) => void
}

export function ModuleCreationModal({modalIsOpen, setModalIsOpen}: LoginModalProps) {
  const { data: session } = useSession()
  const router = useRouter()

  const [nameModule, setNameModule] = useState('')
  const [loading, setLoading] = useState(false)

  function closeModal() {
    setModalIsOpen(false)
  }

  async function handleCreateMadule(e) {
    e.preventDefault()

    setLoading(true)
    if(nameModule.trim() === '') {
      alert('Por favor insira um valor para continuar')
      return;
    }

    const data = {
      module_id: uuidv4(),
      module_name: nameModule,
      created_by_user: session.user.email,
      classes: []
    }

    const response = await api.post('modules', data).then(res => res.data)

    if(response.message) {
      alert(response.message);
    }


    router.push(`/modules/${data.module_id}/${session.user.email}`)
    setLoading(false)
    closeModal()
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
          margin: '0 auto',
          maxWidth: 420,
          height: 'max-content'
        }
      }}
      over
    >
      <div className={styles.container}>
        <header>
          <h1>Novo Modulo</h1>
          <button onClick={closeModal} className={styles.closeModal}>
            <FiX />
          </button>
        </header>        
        <form>
          <input 
            value={nameModule} 
            type="text" 
            placeholder='Insira o nome do seu module: Ex: Cors no nodejs' 
            onChange={(e) => setNameModule(e.target.value)}
          />
          <button onClick={handleCreateMadule} type="submit">
            {loading ? 'Carregando' : 'Criar'}
          </button>
        </form>
      </div>
    </Modal>
  )
}