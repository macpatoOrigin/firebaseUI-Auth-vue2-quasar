# firebaseUI-Auth-vue-quasar
firebase firebaseUI auth login facebook google custom mail phone vue js quasar framework

![demo](https://raw.githubusercontent.com/macpatoOrigin/firebaseUI-Auth-vue2-quasar/master/Captura.PNG)

# Quasar App + Firebase Auth

Made with Quasar Framework 

Quasar CLI Documentation http://quasar-framework.org/guide/quasar-cli.html

## Installation

`$ quasar init <folder-name>`

Download this repository, paste their files into your quasar project and run:

`$ npm install`

Or

`$ yarn install`


Replace the config values of your firebase app into file src/plugins/firebase.js

```js
  apiKey: "...",
  authDomain: "...",
  databaseURL: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "..."
  
```

## explore routes

 ```js
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/index') }
    ]
  },
  {
    path: '/login',
    component: () => import('pages/auth/login')
  },
  {
    path: '/success',
    component: () => import('pages/auth/success'),
    meta: {
      requiresAuth: true
     }
  },
  {
    path: '/verifyEmail',
    component: () => import('pages/auth/verifyEmail'),
    meta: {
      requiresAuth: true
     }
  },
  {
    path: '/completeAccount',
    component: () => import('pages/auth/completeAccount'),
    meta: {
      requiresAuth: true
     }
  },
  {
    path: '*',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/index') }
    ]
  }
]
 ```
 
## mounted login
src/pages/auth/login.vue

 ```js
    mounted() {
    var uiConfig = {
      signInSuccessUrl: '/',
      signInOptions: [
            {
                provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                recaptchaParameters: {
                    size: 'invisible',
                    badge: 'bottomleft' //' bottomright' or 'inline' applies to invisible.
                },
                defaultCountry: 'AR',
                loginHint: '+54'
            },
            //firebase.auth.TwitterAuthProvider.PROVIDER_ID, // Twitter does not support scopes.
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID, // Other providers don't need to be given as object.
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        'credentialHelper': firebaseui.auth.CredentialHelper.NONE
      };
      let ui = firebaseui.auth.AuthUI.getInstance();
      if (!ui) {
        ui = new firebaseui.auth.AuthUI(firebase.auth());
      }
      ui.start('#firebaseui-auth-container', uiConfig);
      firebase.auth().onAuthStateChanged(function(user) {
                if ((user) && !user.emailVerified) {
                    var actionCodeSettings = {
                        url: 'http://..../',
                        handleCodeInApp: true,
                    };
                    user.sendEmailVerification().then(function() {
                    // Email sent.
                    }).catch(function(error) {
                    // An error happened.
                    });
                }
      });
    }
 ```   
    
#### And now, only for CUSTOM EMAIL LOGIN firebase.auth.EmailAuthProvider.PROVIDER_ID, we need generate two files: 
#### one restriction file view to say "hey, you need validate your account via link email" 
this has a button which allows you to forward the mail through the method resend()

src/pages/auth/verifyEmail.vue
 ```js 
         methods: {
            resend() { 
                firebase.auth().onAuthStateChanged(function(user) {
                    if ((user) && !user.emailVerified) {
                        var actionCodeSettings = {
                            url: '',
                            handleCodeInApp: true,
                        };
                        user.sendEmailVerification().then(function() {
                        // Email sent.
                        }).catch(function(error) {
                        // An error happened.
                        });
                    }
                });
            } 
        }
  ```   
### And if te user not do te validation () we need ever redirect to verifyEmail.vue
#### This logic is here in src/plugins/firebase.js...

```js
router.beforeEach((to, from, next) => {
        firebase.auth().onAuthStateChanged(function(user) {
 ```
 
#### the last file is src/pages/auth/completeAccount.vue
## when te user verify your account trought email link validation then show te completeAccount

The important code from here is this

```js
created() { 
        var actionCode = this.$route.query.oobCode.toString();
        firebase.auth().applyActionCode(actionCode).then(function(resp) {
            firebase.auth().currentUser.reload();
 ```
 
