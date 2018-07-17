<template> 
    <div id="finishVerification"> 
        <h3>¡Felicitaciones!.{{name}} </h3>
        <p><button @click='logOut'>Log out</button></p>
        <p>FOTO:<img :src='photo' style='height: 120px'> </p>
        <p>Nombre: {{name}}</p> 
        <p>Email: {{email}}</p> 
        <p>ID: {{userId}}</p> 
    </div>
</template>

<script>
    import firebase from 'firebase'
    export default {
        data(){
            return {
                photo: '',
                userId: '',
                name: '',
                email: ''
            }
        },
        created() { 
        var actionCode = this.$route.query.oobCode.toString();
        console.log(actionCode);
        firebase.auth().applyActionCode(actionCode).then(function(resp) {
            alert("reload");
            firebase.auth().currentUser.reload();
            console.log(firebase.auth().currentUser.emailVerified);
        }).catch(function(error) {
            alert("error");
            console.log(error);
        });
            firebase.auth().onAuthStateChanged(user => {
            if(user) { 
                this.name = user.displayName; 
                this.email = user.email; 
                this.photo = user.photoURL; 
                this.userId = user.uid; 
            } 
            });
        },
        methods: { 
        logOut() { 
            firebase.auth().signOut();
            this.$router.push('/login');
            } 
        },
    };
</script>