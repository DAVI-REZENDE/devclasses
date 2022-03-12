const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

module.exports = async (moduleName) => {

  const db = getFirestore();

  const docRef = db.collection('modules')
  const snapshot = await docRef.where('module_name', '==', moduleName).get()

  if (snapshot.empty) {
    return false
  } else return true
}