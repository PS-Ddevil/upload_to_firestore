const admin = require('./node_modules/firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");
const book_data = require("./data/books.json");
const bookdetails_data = require("./data/bookdetail.json");
const col_books = "books"; //name of the collection
const col_bookdetail = "bookdetail"; //name of the collection
admin.initializeApp({ 
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sinhalib.firebaseio.com"
});
const firestore = admin.firestore();
const settings = {timestampsInSnapshots: true};

firestore.settings(settings);
if (book_data && (typeof book_data === "object")) {
    Object.keys(book_data).forEach(key => { 
        firestore.collection(col_books)
        .doc(key)
        .set(book_data[key])
        .then((res) => {
            console.log("Document " + key + " successfully written!");
        }).
        catch((error) => {
            console.error("Error writing document: ", error);
        });
    });
}

if (bookdetails_data && (typeof bookdetails_data === "object")) {
    Object.keys(bookdetails_data).forEach(key => { 
        firestore.collection(col_bookdetail)
        .doc(key)
        .set(bookdetails_data[key])
        .then((res) => {
            console.log("Document " + key + " successfully written!");
        }).
        catch((error) => {
            console.error("Error writing document: ", error);
        });
    });
}