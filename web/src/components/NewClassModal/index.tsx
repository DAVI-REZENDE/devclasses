import { useState } from 'react';
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid';

import { FiCheck } from 'react-icons/fi';
import Modal from 'react-modal';
import styles from './styles.module.scss'
import { api } from '../../services/api';

Modal.setAppElement('#__next');

interface NewClassModalProps {
  modalIsOpen: boolean
  setModalIsOpen: (boolean) => void,
  moduleName: string
}

export function NewClassModal({modalIsOpen, setModalIsOpen, moduleName}: NewClassModalProps ) {

  const [newClassName, setNewClassName ] = useState('')
  const [newClassDate, setNewClassDate ] = useState('')
  const [newClassDuration, setNewClassDuration ] = useState<number>()

  const router = useRouter()

  function closeModal() {
    setModalIsOpen(false)
  }

  async function handleCreateNewClass() {

    if(newClassName.trim() === '' ||
       newClassDate.trim() === '' ||
       newClassDuration === 0) {
      alert('Preencha todos os campos de forma correta')
      return;
    }
    
    const data = {
      module_name: moduleName,
      id: `class_${uuidv4()}`,
      name: newClassName,
      stream_date: newClassDate,
      module: moduleName,
      duration: (newClassDuration * 6000)
    }

    console.log(data);
    

    await api.post('classes', data)
      .then(res => res.data)
      .catch(err => console.log(err))
      .finally(() => setModalIsOpen(false))

    router.reload()
    
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
      <div className={styles.container} >
        <h1>Nova aula</h1>

        <form>
          <input onChange={(e) => setNewClassName(e.target.value)} value={newClassName} placeholder='Qual o nome desta aula?' type="text" />
          <input onChange={(e) => setNewClassDate(e.target.value)} value={newClassDate} placeholder='Quando essa aula vai ao ar?' type="date" />
          <input onChange={(e) => setNewClassDuration(Number(e.target.value))} value={newClassDuration} placeholder='Qual vai ser a duração dela em minutos?' type="number" />
        </form>

        <button onClick={handleCreateNewClass} type='button'>
          Criar aula
          <FiCheck size={24} />
        </button>
      </div>
    </Modal>
  )
}