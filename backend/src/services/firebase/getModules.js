const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

module.exports = async () => {
  const db = getFirestore();

  const snapshot = await db.collection('modules').get();
  let data = []

  snapshot.forEach((doc) => {
   data.push(doc.data());
  });

  return data
}