const express = require('express')
const app = express()
const cors = require('cors')
const port = 3030

app.use(cors({
  origin: 'http://localhost:3000'
}))

app.use(express.json())

const { v4: uuidv4 } = require('uuid');

const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const getModules = require('./services/firebase/getModules')
const initFireBase = require('./services/firebase/initFirebase')
const verifyIfModuleExists = require('./services/firebase/verifyIfModuleExists');
const getClasses = require('./services/firebase/getClasses');

initFireBase()
const db = getFirestore();

app.get('/modules', async (req, res) => {

  const { module_id } = req.body

  const data = await getModules(module_id)

  res.status(200).json(data)
})

app.post('/modules', async (req, res) => {
  const data = req.body

  try {

    const hasModule = await verifyIfModuleExists(data.module_name)

    if (!hasModule) {
      const newModuleRef = db.collection('modules').doc(uuidv4())
      await newModuleRef.set(data);

      const response = await getModules()

      res.json(response)
      return;
    }

    return res.status(200).json({ message: "Nome ja existente" })

  } catch (err) {
    res.send(`Error: ${err}`).status(400)
  }

})

app.put('/modules', async (req, res) => {
  const data = req.body

  try {
    const hasModule = await verifyIfModuleExists(data.module)

    if (hasModule) {
      let moduleId
      const docRef = db.collection('modules')
      const snapshot = await docRef.where('module_name', '==', data.module).get()

      snapshot.forEach(doc => {
        moduleId = doc.id
      })

      const moduleUpdateRef = db.collection('modules').doc(moduleId)

      await moduleUpdateRef.set({
        module_name: data.new_name
      }, { merge: true })

      res.status(200).send({ ok: true })
      return;
    }

    res.status(400).send({ ok: false })

  } catch (err) {
    res.status(400).send(err)
  }

})

app.delete('/modules', async (req, res) => {
  const {module_name} = req.body

  try {
    let moduleId
    const docRef = db.collection('modules')
    const snapshot = await docRef.where('module_name', '==', module_name).get()

    snapshot.forEach(doc => {
      moduleId = doc.id
    })

    await db.collection('modules').doc(moduleId).delete()

    res.status(200).send({ ok: true })
  } catch (error) {
    res.status(400).send(error)
  }

})

app.get('/classes', async (req, res) => {
  const { module_id } = req.body

  const data = await getClasses(module_id)

  res.status(200).json(data)
})

app.post('/classes', async (req, res) => {
  const {
    module_name,
    id,
    name,
    stream_date,
    module,
    duration
  } = req.body

  try {
    let docId

    const getDocId =  db.collection('modules')
    const snapshot = await getDocId.where('module_name', '==', module_name).get()

    snapshot.forEach(doc => {
      docId = doc.id
    })

    const docRef = db.collection('modules').doc(docId)
    await docRef.update({
      classes: FieldValue.arrayUnion({
        id,
        name,
        stream_date,
        module,
        duration
      })
    }, { merge: true })

    res.status(200).send({ ok: true })
  } catch (error) {
    res.status(400).send(error.message)
  }

})

app.put('/classes', async (req, res) => {
  const {
    ...rest
  } = req.body

  try {
    let docId

    const getDocId =  db.collection('modules')
    const snapshot = await getDocId.where('module_name', '==', rest.module_name).get()

    snapshot.forEach(doc => {
      docId = doc.id
    })

    const docRef = db.collection('modules').doc(docId)
    const getClasses = await docRef.get()
    const { module_name, ...current} = rest
    const classes = getClasses.data().classes.map(item => {
      if(item.id === rest.id) {
        item = current
      }

      return item
    })

    await docRef.set({
      classes
    }, { merge: true })

    res.status(200).send({ ok: true })
    // res.json(classes)

  } catch (error) {
    res.status(400).send(error.message)
  }
})

app.delete('/classes', async (req, res) => {
  const {
    module_id,
    class_id,
  } = req.body

  try {
    let docId
    let classes = []
    
    const getDocId =  db.collection('modules')
    const snapshot = await getDocId.where('module_id', '==', module_id).get()

    snapshot.forEach(doc => {
      docId = doc.id
      classes = doc.data().classes
    })

    const filteredClasses = classes.filter((item) => {
      return item.id !== class_id
    })

    console.log(filteredClasses)

    const docRef = db.collection('modules').doc(docId)
    
    await docRef.set({
      classes: filteredClasses
    }, { merge: true });

    res.status(200).send({ ok: true })
  } catch (error) {
    res.status(400).send(error.message)
  }
})

app.get('/user_admin', async (req, res) => {

  try {
    const snapshot = await db.collection('users-admins').doc('users').get()

    res.status(200).send({ data: snapshot.data() })
    
  } catch (error) {
    res.status(400).send(error.message)
  }
})

app.post('/user_admin', async (req, res) => {
  const { email } = req.body

  console.log(email);

  try {
    const docRef = db.collection('users-admins').doc('users')

    await docRef.update({
      list: FieldValue.arrayUnion({
        email
      })
    }, { merge: true })

    res.status(200).send({ ok: true })
    
  } catch (error) {
    res.status(400).send(error.message)
  }
})

app.listen(port, () => {
  console.log(`Api is runing in ${port}`)
})

// {
//   "module_name": "Fundamentos do Next.js",
//   "module_id": 34356347346783468,
//   "created_by_user_id": 36376673789347982479,
//   "classes": [
      // {
      //     "id": "class_847455694",
      //     "name": "Aula 1",
      //     "module": "Fundamentos do Next.js",
      //     "stream_date": "14/04/2022"
      //     "duration": "600000"
      // },
//       {
//           "id": "class_8474475694",
//           "name": "Aula 2",
//           "duration": "600000"
//       },
//       {
//           "id": "class_4898247578",
//           "name": "Aula 3",
//           "duration": "600000"
//       },
//       {
//           "id": "class_3568967306",
//           "name": "Aula 4",
//           "duration": "600000"
//       }
//   ]
// }