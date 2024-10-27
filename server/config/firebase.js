const dotenv = require('dotenv');

dotenv.config();

const admin = require('firebase-admin');
const serviceAccount = require('../config/firebaseServiceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: 'https://modular-citron-363521.firebaseio.com'
});


module.exports = admin;


 /* script  para  verificar  error  de  conexion  a  firebase account
admin.auth().listUsers(1)
  .then((result) => console.log('Firebase configurado correctamente:', result))
  .catch((error) => console.error('Error al configurar Firebase:', error));
*/