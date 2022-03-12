const { getFirestore } = require("firebase-admin/firestore");


module.exports = async ( moduleId ) => {
  const db = getFirestore();
  
  let docId
  const docRef = db.collection('modules')
  const snapshot = await docRef.where('module_id', '==', moduleId).get()

  snapshot.forEach(doc => {
    docId = doc.id
  })

  const moduleUpdateRef = await db.collection('modules').doc(docId).get()

  return moduleUpdateRef.data().classes
}