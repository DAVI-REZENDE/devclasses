import Modal from 'react-modal';
import { DefaultButton } from '../DefaultButton';

import styles from './styles.module.scss'

Modal.setAppElement('#__next');

interface LoginModalProps {
  modalIsOpen: boolean,
  setModalIsOpen: (boolean) => void,
  warning: string,
  onClick: () => void
}

export function AlertModal({
  modalIsOpen, 
  setModalIsOpen, 
  warning,
  onClick
}: LoginModalProps) {


  function closeModal() {
    setModalIsOpen(false)
  }

  async function handleAcceptWarning() {
    onClick()
    setModalIsOpen(false)
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
          height: 'min-content'
        }
      }}
      over
    >
      <div className={styles.container}>
        <span>
          {warning}
        </span>

        <div className={styles.buttons}>
          <DefaultButton onClick={closeModal} full dark>Não</DefaultButton>
          <DefaultButton onClick={handleAcceptWarning} full>Sim</DefaultButton>
        </div>
      </div>
    </Modal>
  )
}