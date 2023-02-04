// import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
// import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'
// import { getAuth } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js'
// import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
// const provider = new FacebookAuthProvider();
const firebaseConfig = {
  apiKey: "AIzaSyD9m74Ngn7FI82IM2YdXPGljvGbQSMvLUY",
  authDomain: "icebase-31674.firebaseapp.com",
  databaseURL: "https://icebase-31674-default-rtdb.firebaseio.com",
  projectId: "icebase-31674",
  storageBucket: "icebase-31674.appspot.com",
  messagingSenderId: "551544382823",
  appId: "1:551544382823:web:1a5c13dee46d1ad3b13bc2"
};

 // Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = app.database();
const fs = app.firestore();
const auth = app.auth();
auth.useDeviceLanguage();
// db.settings({ timestampsInSnapshot: true })
document.querySelector('#submit').addEventListener('click', () => { 
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let username = document.getElementById('username').value;
  db.ref('user-info/' + username).set({
    name: name,
    username: username,
    email:  email
  })
})
  

  document.querySelector('#get').addEventListener('click', () => { 
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let username = document.getElementById('username').value;
  let user_ref = db.ref('user-info/' + username)
    user_ref.on('value', function(snapshot) {
      let data = snapshot.val()
      console.log(data.email)
    })
})


document.querySelector('#update').addEventListener('click', () => { 
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let username = document.getElementById('username').value;
  let updates = {
    name: name,
    username: username,
    email:  email
  }         
   db.ref('user-info/' + username).update(updates)
  })


  document.querySelector('#delete').addEventListener('click', () => { 
  let username = document.getElementById('username').value;
   db.ref('user-info/' + username).remove()
  })

  // Tracking auth status
  auth.onAuthStateChanged(user => {
    if (user) {
      fs.collection('Snippets').get().then(snapshot => {
        snippets(snapshot.docs)
        setupUI(user)
      })
    } else {
      setupUI();
     snippets([]);
    }
  })

  const fb = document.querySelector('#fb-login')
  fb.addEventListener('click', (e) => {

 
  const facebookProvider = () => {
    // [START auth_facebook_provider_create]
    var provider = new auth.FacebookAuthProvider();
    // [END auth_facebook_provider_create]
  
    // / [START auth_facebook_provider_scopes]
    provider.addScope('user_birthday');
    // [END auth_facebook_provider_scopes]
  
    // [START auth_facebook_provider_params]
    provider.setCustomParameters({
      'display': 'popup'
    });
    // [END auth_facebook_provider_params]
  }
  
  const facebookSignInPopup = (provider) => {
    // [START auth_facebook_signin_popup]
    
     auth.signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.authResponse;
        console.log(result, authResponse)
        // The signed-in user info.
        var user = result.user;
  
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var accessToken = credential.accessToken;
        const loginForm = document.querySelector('#login-form');
        const modal = document.querySelector('#modal-login');
          M.Modal.getInstance(modal).close();
          loginForm.reset();
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
  
        // ...
      });
    // [END auth_facebook_signin_popup]
  }
})
  // Sign up

  const signUpForm = document.querySelector('#signup-form');

  // sign up, takes submit and turns it into an object event. 
  signUpForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // assign values
  const email = signUpForm['signup-email'].value;
  const password = signUpForm['signup-password'].value;

  // creates account
  auth.createUserWithEmailAndPassword(email, password).then(cred => {


    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signUpForm.reset();
    })
  });
  
  //Logout
  const logout = document.querySelector('#logout');
  logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
  });

  // login

  const loginForm = document.querySelector('#login-form');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

      // logging in
      auth.signInWithEmailAndPassword(email, password).then((cred) => {

          const modal = document.querySelector('#modal-login');
          M.Modal.getInstance(modal).close();
          loginForm.reset();
      });
  });

 fs.collection('Snippets').get().then(snapshot =>{
    snippets(snapshot.docs)
 })