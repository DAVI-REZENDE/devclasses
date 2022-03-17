import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import Modal from 'react-modal';

import styles from './styles.module.scss'

Modal.setAppElement('#__next');

interface LoginModalProps {
  modalIsOpen: boolean,
  setModalIsOpen: (boolen) => void,
  modalType?: 'creation' | 'update',
  onClick: (newName: string) => void 
}

export function ModalWithInput({
  modalIsOpen, 
  setModalIsOpen, 
  modalType = 'creation',
  onClick
}: LoginModalProps) {
  const [valueInput, setValueInput] = useState('')
  const [loading, setLoading] = useState(false)

  function closeModal() {
    setModalIsOpen(false)
  }

  async function handleCreateModule(e) {
    e.preventDefault()
    setLoading(true)

    if(valueInput.trim() === '') {
      alert('Por favor insira um valor para continuar')
      return;
    }
    
    onClick(valueInput)
    
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
          <h1>{modalType === 'creation' ? 'Criar' : 'Atualizar'}</h1>
          <button onClick={closeModal} className={styles.closeModal}>
            <FiX />
          </button>
        </header>        
        <form>
          <input 
            value={valueInput} 
            type="text" 
            placeholder='Insira o nome do seu module: Ex: Cors no nodejs' 
            onChange={(e) => setValueInput(e.target.value)}
          />
          <button onClick={handleCreateModule} type="submit">
            {loading ? 'Carregando' : 'Enviar'}
          </button>
        </form>
      </div>
    </Modal>
  )
}