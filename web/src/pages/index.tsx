import { GetStaticProps } from 'next'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { AdminModal } from '../components/AdminModal'
import { ModuleCard } from '../components/ModuleCard'
import { ModuleCreationModal } from '../components/ModuleCreationModal'
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
        {modules.map(moduleItem => (
          <ModuleCard
            key={moduleItem.id}
            id={moduleItem.id}
            title={moduleItem.name}
            durationModule={moduleItem.duration_module}
            classes={moduleItem.classes}
            createdByUser={moduleItem.created_by_user}
          />
        ))}
      </section>

      <AdminModal modalIsOpen={modalAdminIsOpen} setModalIsOpen={setModalAdmimIsOpen} />
      <ModuleCreationModal modalIsOpen={modalCreationModuleIsOpen} setModalIsOpen={setModalCreationModuleIsOpen} />
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