import firebase from 'firebase'
var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};

firebase.initializeApp(config)

export default ({ app, router, store, Vue }) => {
    Vue.prototype.$firebase = firebase
    router.beforeEach((to, from, next) => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (!user && to.path != "/login") {
                next("/login");     
            }
            if (user){
                if (!user.emailVerified && to.path != "/verifyEmail" && to.path != "/completeAccount") {
                    next("/verifyEmail");
                }else if (to.path == '/login' ||to.path == "/verifyEmail" || to.path == "/completeAccount")
                {
                    next("/");
                }
            }    
            next();            
        })

    })
  }
