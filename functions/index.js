const functions = require('firebase-functions');
const admin = require('firebase-admin');
var serviceAccount = require("./serviceAccountKey.json");

const PROJECT_ID = "banglawordlearner";
admin.initializeApp();

exports.setCount=functions.database.ref('sadman/users/{userID}/files/').onWrite((change,context) => {
    if (change.after.exists()) {
    const userID = context.params.userID;
    var count = 0;
    const allFiles = change.after.val();
    for (var x in allFiles) {
        console.log("Index ", x);
        var indexItem = allFiles[x];
        for (var recordings in indexItem) {
            count++;
            console.log("Recording " + count + " " + indexItem[recordings]);
        }
    }
    console.log(userID + " Total count " + count);
    return admin.database().ref('sadman/leaderboard/' + userID).set(count);
}
else
return 0;
});


