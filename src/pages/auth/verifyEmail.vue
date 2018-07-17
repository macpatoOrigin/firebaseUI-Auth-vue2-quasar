<template lang="html">
    <div id="verificationMail">
        <h3>Validacion de Cuenta</h3>
        <p>Hola <strong>{{name}}</strong>, necesitamos que valides tu cuenta</p>
        <p>Te hemos enviado un correo a la casilla <strong>{{email}}</strong> con el asunto <strong>{{subjet}}</strong></p>
        <p>Este mail contiene el link que te permitirá acceder al sistema.</p>
        <p><button @click='resend'>Reenviar Mail</button></p>
    </div>
</template>

<script>
    import firebase from 'firebase'
    export default{
        name: 'verificationMail',
        data() {
        return {
                name: '',
                email: '',
                subjet: "Validación de cuenta"
        };
        },
        created() { 
            firebase.auth().onAuthStateChanged(user => {
            if(user) { 
                this.name = user.displayName; 
                this.email = user.email;
            } 
            });
        },
        methods: {
            resend() { 
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
    };
</script>
