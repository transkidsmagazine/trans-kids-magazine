 ///////////
  /*BACKEND*/
  ///////////

  // Import the functions you need from the SDKs you need
  import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js'
  import { getFirestore, collection, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADCEN7sBA-5TD4RiJu66gmHZNYevA_rE4",
  authDomain: "trans-kids-magazine.firebaseapp.com",
  projectId: "trans-kids-magazine",
  storageBucket: "trans-kids-magazine.appspot.com",
  messagingSenderId: "791794186489",
  appId: "1:791794186489:web:847cd7f8048bafc60a8a28"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

let Interviews = [];

class Interview {
    constructor(image, name, username, pronouns, bio, city, origin, identity, challenges, family, icons, id) {
        this.image = image;
        this.name = name;
        this.username = username;
        this.pronouns = pronouns;
        this.bio = bio;
        this.city = city;
        this.origin = origin;
        this.identity = identity;
        this.challenges = challenges;
        this.family = family;
        this.icons = icons;
        this.id = id;
    }
}

//Get interviews from Firestore Database
const querySnapshot = await getDocs(collection(db, "interviews"), orderBy("name", "asc"));
await querySnapshot.forEach((doc) => {
    const image = doc.data().gallery_image;
    const name = doc.data().name;
    const username = doc.data().username;
    const pronouns = doc.data().pronouns;
    const bio = doc.data().bio;
    const city = doc.data().city;
    const origin = doc.data().origin;
    const identity = doc.data().identity;
    const challenges = doc.data().challenges;
    const family = doc.data().family;
    const icons = doc.data().icons;
 
    const GalleryDiv = '<div class="card" id=' + Interviews.length +'><div class="card-image-wrapper"><img src="' + image + '" ></div></div>';
    $("#gallery-track").append(GalleryDiv);
    Interviews.push(new Interview(image, name, username, pronouns, bio, city, origin, identity, challenges, family, icons, Interviews.length));
});

//Get interviews from Firestore Database
const querySnapshotText = await getDocs(collection(db, "texts"));
await querySnapshotText.forEach((doc) => {
    $("#introText").text(doc.data().intro);
    $("#join").text(doc.data().button);
    $("#magazine").attr("href", doc.data().magazine);
});

$("#gallery-track").on("click", ".card", function () {
    //Get correct Project
    var id = $(this).attr('id');
    let index;
    for (let i = 0; i < Interviews.length; i++) {
        if (Interviews[i].id == id) {
            index = i;
            break
        }
    }
    const interview = Interviews[index];
    $("#galleryImage").css({ "background-image": 'url(' + interview.image + ')' });
    $("#interviewName").text(interview.name);
    $("#username").text(interview.username);
    $("#username").attr("href", "https://www.instagram.com/" + interview.username + "/")
    $("#pronouns").text(interview.pronouns);
    $("#bio").text(interview.bio);
    $("#city").text(interview.city);

    var text = interview.origin,
        target = document.getElementById('origin'),
        converter = new showdown.Converter(),
        html = converter.makeHtml(text);
    target.innerHTML = html;

    text = interview.identity,
        target = document.getElementById('identity'),
        converter = new showdown.Converter(),
        html = converter.makeHtml(text);
    target.innerHTML = html;

    text = interview.challenges,
        target = document.getElementById('challenges'),
        converter = new showdown.Converter(),
        html = converter.makeHtml(text);
    target.innerHTML = html;

    text = interview.family,
        target = document.getElementById('family'),
        converter = new showdown.Converter(),
        html = converter.makeHtml(text);
    target.innerHTML = html;

    text = interview.icons,
        target = document.getElementById('icons'),
        converter = new showdown.Converter(),
        html = converter.makeHtml(text);
    target.innerHTML = html;

    $('#interview').css('display', 'block');
    $('#welcome2').css('display', 'none');
});

$('#logo').on('click', () => {
    $('#welcome2').css('display', 'block');
    $('#interview').css('display', 'none');
});