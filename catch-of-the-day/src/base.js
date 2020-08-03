import Rebase from 're-base'
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBvo-hiEdRkbVA1rNp5Lu6I01Ps8Lr3IsQ',
  authDomain: 'catch-of-the-day-mtriggs.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day-mtriggs.firebaseio.com',
  appId: '1:717615501838:web:db831fd4dc1f4cd1cee25f',
  measurementId: 'G-5KHST5HCKY'
})

const base = Rebase.createClass(firebaseApp.database())

// This is a named export
export { firebaseApp }

// This is a default export
export default base
