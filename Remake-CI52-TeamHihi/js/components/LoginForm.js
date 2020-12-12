import { validateEmail } from "../LoginJS/validateEmail.js";
import { showValidate, hideValidate } from "../LoginJS/toggleValidate.js";
import { md5, makeAuth, getDataFromDoc } from "../LoginJS/utils.js";

const $templateLogin = document.createElement("template");
$templateLogin.innerHTML = /*html*/ `
<!--===============================================================================================-->
<link rel="icon" type="image/png" href="../images/Login-IMG/icons/favicon.ico" />
<!--===============================================================================================-->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<!--===============================================================================================-->
<!--===============================================================================================-->
<link rel="stylesheet" type="text/css" href="../css/vendor/animate/animate.css">
<!--===============================================================================================-->
<link rel="stylesheet" type="text/css" href="../css/vendor/css-hamburgers/hamburgers.min.css">
<!--===============================================================================================-->
<link rel="stylesheet" type="text/css" href="../css/vendor/select2/select2.min.css">
<!--===============================================================================================-->
<link rel="stylesheet" type="text/css" href="../css/Login-CSS/util.css">
<link rel="stylesheet" type="text/css" href="../css/Login-CSS/main.css">
<!--===============================================================================================-->


<div class="limiter">
		<div class="container-login100" style="padding-top:10%;">			
			<div class="wrap-login100">
				<div class="login100-pic js-tilt" data-tilt>
					<img src="../images/Login-IMG/img-01.png" alt="IMG">
				</div>

				<form class="login100-form validate-form" id="form-login">
					<span class="login100-form-title">
						Member Login
					</span>

					<div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
						<input class="input100" type="text" name="email" placeholder="Email" id="email">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>

					<div class="wrap-input100 validate-input" data-validate="Password is required">
						<input class="input100" type="password" name="pass" placeholder="Password" id="pass">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>


					<div class="container-login100-form-btn">
						<button class="login100-form-btn" id="login-btn">
							Login
						</button>
					</div>

					<div class="text-center p-t-136">
						<a class="txt2" id="register_link" href="">
							Haven't have an account? Sign up now
							<i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
						</a>
					</div>
				</form>
			</div>
		</div>
    </div>
    
    	<!--===============================================================================================-->
	<script src="../css/vendor/bootstrap/js/popper.js"></script>
	<script src="../css/vendor/bootstrap/js/bootstrap.min.js"></script>
	<!--===============================================================================================-->
	<script src="../css/vendor/select2/select2.min.js"></script>
	<!--===============================================================================================-->
	<script src="../css/vendor/tilt/tilt.jquery.min.js"></script>
	<script>
		$('.js-tilt').tilt({
			scale: 1.1
		})
	</script>
	<!--===============================================================================================-->
	<script src="../js/LoginJS/main.js"></script>
    `;
class LoginForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    
    this.shadowRoot.appendChild($templateLogin.content.cloneNode(true));
    
    this.$formLogin = this.shadowRoot.getElementById("form-login");
    this.$email = this.shadowRoot.querySelector("#email");
    this.$password = this.shadowRoot.getElementById("pass");
    this.$regisLink = this.shadowRoot.getElementById("register_link");
  }

  connectedCallback() {
    this.$formLogin.onsubmit = async (event) => {
      event.preventDefault();
      let checkEmail = validateEmail(this.$email.value);
      let checkEmpty = (str) => {
        if (str == "") return false;
        return true;
      };

      if (!checkEmail) {
        showValidate(this.$email);
      } else hideValidate(this.$email);

      if (!checkEmpty(this.$password.value)) {
        showValidate(this.$password);
      } else {
        hideValidate(this.$password);
      }
      let isPassed = false;
      if (checkEmpty(this.$password.value) && checkEmail) {
        isPassed = true;
      } else {
        console.log(this.$password.value);
        console.log(this.$email.value);
      }
      // let email = this.$email;
      // let password = this.$password;

      // let isPassed =  checkInputWrapperValue(email, function(value) {
      //     if(value == "" || !validateEmail(value)) return false
      //     return true
      // }, "lỗi email") & checkInputWrapperValue(password, function(value) {
      //     if(value == "") return false
      //     return true
      // }, "nhap vao pass");

      // console.log(isPassed)
      if (isPassed) {
        let result = await firebase
          .firestore()
          .collection("users")
          .where("email", "==", this.$email.value)
          .where("password", "==", md5(this.$password.value))
          .get();

        if (result.empty) {
          alert("Email hoặc mật khẩu không chính xác");
        } else {
          makeAuth(getDataFromDoc(result.docs[0], ["password"]));
          window.open("./home.html", "_self");
        }
      }
    };
    this.$regisLink.onclick = function (event) {
      event.preventDefault();
      console.log("click");
      router.navigate("/sign-up");
    };
  }
}

window.customElements.define("login-form", LoginForm);
