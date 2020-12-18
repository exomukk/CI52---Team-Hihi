const $templateNavbar = document.createElement("template");


$templateNavbar.innerHTML = /*html*/ `
<!-- Favicon Icon -->
<link rel="icon" type="image/png" href="../images/HomePagesIMG/favcion.png" />
<!-- Bootstrap CSS -->
<link rel="stylesheet" type="text/css" href="../css/HomePageCSS/bootstrap.min.css" media="all" />
<!-- Iconfont CSS -->
<link rel="stylesheet" type="text/css" href="../css/HomePageCSS/icofont.css" media="all" />
<!-- Popup CSS -->
<link rel="stylesheet" type="text/css" href="../css/HomePageCSS/magnific-popup.css">
<!-- Owl carousel CSS -->
<link rel="stylesheet" type="text/css" href="../css/HomePageCSS/owl.carousel.css">
<!-- Responsive CSS -->
<link rel="stylesheet" type="text/css" href="../css/HomePageCSS/responsive.css" media="all">
<!-- Slick nav CSS -->
<link rel="stylesheet" type="text/css" href="../css/HomePageCSS/slicknav.min.css" media="all" />

<!-- Style Main CSS -->
<link rel="stylesheet" type="text/css" href="../css/HomePageCSS/style.css" media="all" />

<!-- jquery main JS -->
<script src="../js/HomePageJS/jquery.min.js"></script>
<!-- Bootstrap JS -->
<script src="../js/HomePageJS/bootstrap.min.js"></script>
<!-- Slick nav JS -->
<script src="../js/HomePageJS/jquery.slicknav.min.js"></script>
<!-- owl carousel JS -->
<script src="../js/HomePageJS/owl.carousel.min.js"></script>
<!-- Popup JS -->
<script src="../js/HomePageJS/jquery.magnific-popup.min.js"></script>
<!-- Isotope JS -->
<script src="../js/HomePageJS/isotope.pkgd.min.js"></script>
<!-- main JS -->
<script src="../js/HomePageJS/main.js"></script>

<header class="header">
<div class="container">
    <div class="header-area">
        <div class="logo">
            <a href="home.html"><img src="../images/HomePagesIMG/logo.png" alt="logo" /></a>
        </div>
        
        <div class="menu-area">
            <div class="responsive-menu"></div>
            <div class="mainmenu">
                <ul id="primary-menu">
                    <li><a class="active" href="home.html">Home</a></li>
                    <li><a href="movies.html">Movies</a></li>
                    <li><a href="celebrities.html">Creators</a></li>
                    <li><a href="blog.html">News</a></li>
                    <li><a href="#">Pages <i class="icofont icofont-simple-down"></i></a>
                        <ul>
                            <li><a href="blog-details.html">Blog Details</a></li>
                            <li><a href="movie-details.html">Movie Details</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
</header>


`;

class CustomNavbar extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild($templateNavbar.content.cloneNode(true))

    }

    connectedCallback() {

    }
}

window.customElements.define('custom-navbar', CustomNavbar);
