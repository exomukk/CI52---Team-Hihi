console.log('Router is working!');

var root = null;
var useHash = true; // Defaults to: false
var hash = '#!'; // Defaults to: '#'
var router = new Navigo(root, useHash, hash);

router.on('/home', function() {
        console.log('Home');
        document.getElementById('login-btn').innerHTML = "../html/home.html"
    })
