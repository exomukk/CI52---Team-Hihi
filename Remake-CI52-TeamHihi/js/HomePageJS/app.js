import {auth} from "../LoginJS/utils.js";

$("#movies-page").click(function(event) {
    if(auth()) {
        window.open('./movies.html', '_self')
    }
    else {
        alert('Please login to watch movies')
    }
})