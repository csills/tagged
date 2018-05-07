$(function () {
    let registerBtn = new Register();
    let loginBtn = new Login();

    $(".register").click(() => {
        registerBtn.registerButtonAnimate();
        $(".arrow").fadeOut();
        $(".regForm").fadeIn();
    });
    $(".login").click(() => {
        loginBtn.loginButtonAnimate();
        $(".arrow").fadeOut();
        $(".logForm").fadeIn();
    });

    // button submits for register and login
    $(".regBtn").click(function () {
        let email = $("#emailAddress").val();
        let pass = $("#regPassword").val();
        registerBtn.handleSignUp(email, pass);
    });
    
    $(".logBtn").click(function () {
        let user = $("#email").val();
        let pass = $("#logPassword").val();
        loginBtn.signIn(user, pass);
    });

    // smooth scroll with link clicks
  $('a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));

    if( target.length ) {
      event.preventDefault();
      $('html, body').stop().animate({
        scrollTop: target.offset().top
      }, 1000);
      $(".arrow").fadeOut();
      $(".regForm").fadeOut();
      $(".logForm").fadeOut();

    }
});
    let stateListener = () => {
    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
            // User is signed in.
        setTimeout(function(){
            window.location = '../HomePage/index.html';
        },800);
            console.log("signed in");
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            console.log(uid);
  
            var userId = firebase.auth().currentUser.uid;
            var plate = $("#regPlateNum").val();
            var vin = $('#vin').val();
             
                firebase.database().ref(userId).once('value').then(function (snapshot) {
                    console.log(snapshot.val());
                });
                function writeUserData(userId, plate, vin) {
                    // let email = $("#emailAddress").val();
                    // let pass = $("#regPassword").val();
                    firebase.database().ref(userId).set({
                        plate: plate,
                        vin: vin,
                        messages: ["Welcome to Tagged!"]
                    });
                }
                
                writeUserData(userId, plate, vin);       
            
        }
  
    });
}
stateListener();
});