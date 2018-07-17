<template lang="html">
  <div id="firebaseui-auth-container"></div>
</template>
<style>
    button.firebaseui-idp-button.mdl-button.mdl-js-button.mdl-button--raised.firebaseui-idp-phone.firebaseui-id-idp-button {
        background: rgb(78, 194, 76)!important;
    }
</style>
<script>
import firebase from 'firebase';
import firebaseui from 'firebaseui';
export default {
  name: 'login',
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
}
</script>