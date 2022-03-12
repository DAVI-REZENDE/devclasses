const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const serviceAccount = require('../../../serviceAccountKey.json');

module.exports = async () => {
  initializeApp({
    credential: cert(serviceAccount)
  });
}