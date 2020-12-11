import {auth} from "./utils.js";

console.log("Router");
var root = null
var useHash = true; // Defaults to: false
// Mặc định  : hash = "#"
// var hash = "#!"
var router = new Navigo(root, useHash);

// http://127.0.0.1:5500/index.html/#<link-uri>

//http://127.0.0.1:5500/index.html#/sign-up
router.on('/sign-up', function() {
    console.log("Đăng kí");
    document.getElementById("mainBody").innerHTML = `<custom-navbar></custom-navbar><register-form></register-form>`;
}).resolve()

router.on("/sign-in", function() {
    console.log("Đăng nhập");
    document.getElementById("mainBody").innerHTML = "<custom-navbar></custom-navbar><login-form></login-form>";
    if(auth()) {
        window.location.href = './home.html'
    }

}).resolve();

router.notFound(function () {
    document.getElementById("mainBody").innerText = "Đường dẫn không tồn tại";
});


// router.on('/', function() {
//     if(auth()) {
//         router.navigate('/index')
//     } else {
//         router.navigate('/sign-in')
//     }
// }).resolve()



window.onload = function() {
    // console.log(window.location.hash)
    if(auth() && window.location.hash != '#/sign-up') {
        
        window.location.href = './home.html'
    } else if(window.location.hash == '#/sign-up'){
        router.navigate('/sign-up')
    }
}
window.router = router;