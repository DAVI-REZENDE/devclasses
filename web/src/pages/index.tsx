import { v4 as uuidv4 } from 'uuid';
import { GetStaticProps } from 'next'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { FaPlus } from 'react-icons/fa'
import { AdminModal } from '../components/AdminModal'
import { ModuleCard } from '../components/ModuleCard'
import { ModalWithInput } from '../components/ModalWithInput'
import { api } from '../services/api'
import styles from './home.module.scss'

interface Module {
  id: string,
  name: string,
  classes: number,
  duration_module: number[],
  created_by_user: string
}

interface ModulesProps {
  modules: Module[]
}

export default function Home({ modules }: ModulesProps) {

  const { data: session } = useSession()
  const router = useRouter()
  const [modalAdminIsOpen, setModalAdmimIsOpen] = useState(false)
  const [modalCreationModuleIsOpen, setModalCreationModuleIsOpen] = useState(false)

  async function openModal() {
    const emails = await api.get('user_admin').then(res => res.data)
    let isAdmin = false

    emails.data.list.forEach(item => {
      if(item.email === session.user.email) {
        isAdmin = true
        return;
      }
    });

    if(isAdmin) {
      setModalCreationModuleIsOpen(true)
      return;
    } else {
      setModalAdmimIsOpen(true)
      return;
    }
    
  }

  async function newModule(newName: string) {
    
    const data = {
      module_id: uuidv4(),
      module_name: newName,
      created_by_user: session.user.email,
      classes: []
    }
    const response = await api.post('modules', data).then(res => res.data)

    if(response.message) {
      alert(response.message);
      return;
    }

    router.push(`/modules/${data.module_id}/${session.user.email}`)
  }


  return (
    <main className={styles.main}>
      {session ? (
        <div className={styles.titleLogged}>
          <h1>Modulos disponiveis</h1>
          <button onClick={openModal} type="button">
            <FaPlus />
            Novo modulo
          </button>
        </div>
      ) : <h1>Modulos disponiveis</h1>}

      <section className={styles.listModules}>
        {modules.map(moduleItem => {
          return (
            <ModuleCard
              key={moduleItem.id}
              id={moduleItem.id}
              title={moduleItem.name}
              durationModule={moduleItem.duration_module}
              classes={moduleItem.classes}
              createdByUser={moduleItem.created_by_user}
            />
          )
        })}
      </section>

      <AdminModal modalIsOpen={modalAdminIsOpen} setModalIsOpen={setModalAdmimIsOpen} />
      <ModalWithInput onClick={newModule} modalIsOpen={modalCreationModuleIsOpen} setModalIsOpen={setModalCreationModuleIsOpen} />
    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const response = await api.get('modules').then(res => res.data)

  const modules = response.map(moduleItem => {
    return {
      id: moduleItem.module_id,
      name: moduleItem.module_name,
      classes: moduleItem?.classes?.length,
      duration_module: moduleItem.classes?.map(classItem => Number(classItem.duration)),
      created_by_user: moduleItem.created_by_user
    }
  })

  return {
    props: {
      modules
    }
  }
}