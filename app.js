(function(){
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

    var signup = false;

    //Get elements
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnLogout = document.getElementById('btnLogout');

    var email;
    var pass;
    var age;
    var gender;
    var ethnicity;
    var fullname;
    var permission;
    //Add login event
    btnLogin.addEventListener('click' , e => {
        email =txtEmail_login.value;
        pass = txtPassword_login.value;
        const auth = firebase.auth();
        //Sign in
        const promise = auth.signInWithEmailAndPassword(email,pass).catch(function(error) {
            console.log(error);
            alert(error);
        });
        promise.catch(e => console.log(e.message));
        //window.location.replace("voicerecord.html");
    });

    //Add signup event
    btnSignUp.addEventListener('click' , e => {
        console.log('sign up clicked');
        email = txtEmail_signup.value;
        fullname = txtFullName_signup.value;
        pass = txtPassword_signup.value;
        age = txtAge.value;
        gender = txtGender.value;
        ethnicity = txtEthnicity.value;
        permission = "No";
        if(document.getElementById("boxPermission_signup").checked)
            permission = "Yes";
        const auth = firebase.auth();
        //Sign in
        const promise = auth.createUserWithEmailAndPassword(email,pass).catch(function(error) {
            console.log(error);
            console.log("hi");
            alert(error);
        });
        promise.catch(e => alert("Login failed"));
        signup = true;
        //userId=firebase.auth().currentUser.uid;
        //writeUserData(userId,email,age,gender,ethnicity);
    });

    //Add logout event
    /*btnLogout.addEventListener('click', e =>{
       firebase.auth().signOut();
    });*/

    function writeUserData(userId, fullname, email, age, gender, ethnicity,permission) {
        userId=firebase.auth().currentUser.uid;

        firebase.database().ref('sadman/users/' + userId).set({
            fullname : fullname,
            email : email,
            age: age,
            gender : gender,
            ethnicity : ethnicity,
            permission : permission

        }).catch(e => alert(e));
    }

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
            console.log(firebaseUser);
            if(signup){
                writeUserData(firebase.auth().currentUser.uid,fullname, email,age, gender, ethnicity,permission);
                signup = false;
            }

            window.location.replace("voicerecord.html");
        }else{
            console.log('not logged in');
        }
    });
}());
