const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

module.exports = async (module_id) => {
  const db = getFirestore();

  if(module_id) {
    const snapshot = await db.collection('modules').where('module_id', '==', module_id).get();
    let data
  
    snapshot.forEach((doc) => {
     data = doc.data()
    });

    return data
  } else {
    const snapshot = await db.collection('modules').get();
    let data = []
  
    snapshot.forEach((doc) => {
     data.push(doc.data());
    });

    return data
  }
}