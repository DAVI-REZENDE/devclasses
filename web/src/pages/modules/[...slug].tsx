import { GetServerSideProps } from "next"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa"
import { ClassCard } from "../../components/ClassCard"
import { NewClassModal } from "../../components/NewClassModal"
import { api } from "../../services/api"

import styles from './modulePage.module.scss'

interface ClassProps {
  id: string,
  name: string,
  duration: string,
  module: string,
  stream_date: string
}

interface ModuleProps {
  data: {
    module_id: string,
    module_name: string,
    created_by_user_id: string,
    classes: ClassProps[]
  },

  createdByUser: string
}

export default function Module({ data, createdByUser }: ModuleProps) {  
  const { data: session } = useSession()
  const [totalDurationInMinutes, setTotalDurationInMinutes] = useState(0)
  const [isAdmin, setIsAdmin] = useState<boolean>()
  const [modalNewClassIsOpen, setModalNewClassIsOpen] = useState(false)

  useEffect(() => {
    let allDurations = 0
    const durationAllClasses = data.classes?.map(item => Number(item.duration))
    durationAllClasses?.forEach(duration => allDurations += duration)

    setTotalDurationInMinutes(Math.floor((allDurations / 1000) / 6))

    checkAdmin()
  }, [modalNewClassIsOpen, session])

  async function checkAdmin() {
    console.log(session)
    if(createdByUser === await session?.user.email) {
      setIsAdmin(true)
      return;
    }
  }

  function handleCreateNewClass() {
    setModalNewClassIsOpen(true)
  }

  return (
    <article className={styles.container}>

      {isAdmin ? (
        <div className={styles.titleAdmin}>
          <h1>{data.module_name}</h1>

          <button onClick={handleCreateNewClass} >
            <FaPlus />
            Criar aula
          </button>
        </div>
      ) : (
        <h1>{data.module_name}</h1>
      )}
       
      <div className={styles.details}>
        <span>{data.classes?.length} aula{data.classes?.length > 1 && 's'}</span>
        <span className={styles.circle} />
        <span>{totalDurationInMinutes} minuto{totalDurationInMinutes > 1 && 's'}</span>
      </div>

      <main>
        {data.classes?.map(classItem => (
          <ClassCard
            key={classItem.id}
            id={classItem.id}
            title={classItem.name}
            duration={classItem.duration}
          />
        ))}
      </main>
      <NewClassModal moduleName={data.module_name} modalIsOpen={modalNewClassIsOpen} setModalIsOpen={setModalNewClassIsOpen} />
    </ article>    
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const { slug } = params

  console.log()

  try {
    const data = await api.get('modules', {
      data: {
        module_id: slug[0]
      }
    }).then(res => res.data)

    return {
      props: {
        data,
        createdByUser: slug[1]
      }
    }
  } catch (error) {
    console.log(error.message);
  }
  
}