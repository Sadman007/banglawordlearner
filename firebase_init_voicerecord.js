 var config = {
        apiKey: "AIzaSyBvmbUf_OWwXcojiv4vUaWKeHAMWeFq7YQ",
        authDomain: "banglawordlearner.firebaseapp.com",
        databaseURL: "https://banglawordlearner.firebaseio.com",
        projectId: "banglawordlearner",
        storageBucket: "banglawordlearner.appspot.com",
        messagingSenderId: "1064115267763"
    };
    firebase.initializeApp(config);
    var database = firebase.database();
    var initialize = false;

 firebase.auth().onAuthStateChanged(function(user) {
     if(user)
     {
         console.log(user.uid);
         ///writeUserData(firebase.auth().currentUser.uid, email,age, gender, ethnicity);
         //window.location.replace("voicerecord.html");
         if(!initialize){
             initialize = true;
             var userId = user.uid;
             var start_index=Math.floor(Math.random() * 30);
             console.log('firebase_init_voicerecord.js '+start_index);
             LoadFile(start_index);
             /*
             console.log('sadman/users/' + userId+'/latest/index');
             firebase.database().ref('sadman/users/' + userId+'/latest/index').once('value').then(function(snapshot) {
                 start_index = snapshot.val();
                 if(start_index == undefined)
                     start_index = 0;
                 else
                     start_index++;
                 LoadFile(start_index);
             });

             */

         }
         console.log('finally logged in');
     }
     else
     {
         console.log('not logged in');
         window.location.replace("index.html");
     }
 });
