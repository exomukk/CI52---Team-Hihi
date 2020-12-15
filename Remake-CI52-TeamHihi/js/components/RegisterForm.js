import { validateEmail } from "../LoginJS/validateEmail.js";
import { showValidate, hideValidate } from "../LoginJS/toggleValidate.js";

const $templateRegis = document.createElement('template')
$templateRegis.innerHTML = /*html*/ `
    <!--===============================================================================================-->
	<link rel="icon" type="image/png" href="../images/Login-IMG/icons/favicon.ico" />
	<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="../css/vendor/bootstrap/css/bootstrap.min.css">
	<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="../fonts/LoginPage-Fonts/font-awesome-4.7.0/css/font-awesome.min.css">
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

				<form class="login100-form validate-form" id="register-form">
					<span class="login100-form-title">
						Member Sign Up
					</span>

					<div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
						<input class="input100" type="email" name="email" placeholder="Email" id="email">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>

					<div class="wrap-input100 validate-input" data-validate="Password is required">
						<input class="input100" type="password" name="pass" placeholder="Password" id="password">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>

					<div class="wrap-input100 validate-input" data-validate="Please repeat the correct password" >
						<input class="input100" type="password" name="pass" id="passwordConfirm" placeholder="Password Confirm">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>

					<div class="container-login100-form-btn">
						<button class="login100-form-btn" id="signup-button">
							Sign Up
						</button>
					</div>

					<div class="text-center p-t-136">
						<a class="txt2" id="login_link" href="">
							Already have an account?
							<i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
						</a>
					</div>
				</form>
			</div>
		</div>
	</div>

` 
class RegisterForm extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode:'open'})
        this.shadowRoot.appendChild($templateRegis.content.cloneNode(true))
        this.$registerForm = this.shadowRoot.getElementById('register-form')
        this.$email = this.shadowRoot.getElementById("email")
        this.$pass = this.shadowRoot.getElementById("password")
        this.$passConfirm = this.shadowRoot.getElementById('passwordConfirm')
        this.$loginLink = this.shadowRoot.getElementById('login_link')
    }

    //khi register-form đc thêm vào DOM Tree thì gọi phương thức này
    connectedCallback() {
        function md5(password) {
            return CryptoJS.MD5(password).toString();
        }
        this.$registerForm.onsubmit = async (event) => {
            event.preventDefault();
            let error = 0;
            let checkEmail = validateEmail(this.$email.value);
            if (!checkEmail) {
                showValidate(this.$email);
                error++;
            } else {
                hideValidate(this.$email);
            }
            let isEmpty = (str) => {
                if (str == "") return true;
                return false;
            };

            let checkPass = (password, passConfirm) => {
                if(password == passConfirm) return true
                return false
              };
            if (isEmpty(this.$pass.value)) {
                showValidate(this.$pass);
                error++;
            } else {
                hideValidate(this.$pass);
            }

            if( isEmpty(this.$passConfirm.value)) {
                showValidate(this.$passConfirm)
                error++;
            }  
            if(!checkPass(this.$pass.value, this.$passConfirm.value)) {
                showValidate(this.$passConfirm)
                error++;
            }
            else {
                hideValidate(this.$passConfirm)
            }
            let isPassed = false;
            if(error === 0) isPassed = true;
            if(isPassed) {
                // thực hiện check email trùng
                let result = await firebase
                    .firestore()
                    .collection('users')
                    .where('email', '==', this.$email.value)
                    .get();
                
                console.log(result);
                if(result.empty) {
                    // lưu dữ liệu
                    await firebase.firestore().collection('users').add({
                        email: this.$email.value,
                        password: md5(this.$pass.value)
                    });

                    alert("Đăng kí tài khoản thành công");
                    window.open('./login-register.html#/sign-in')
                } else {
                    alert("Email " + this.$email.value + " đã có người sử dụng!");
                }

            }
                  
        }
        this.$loginLink.onclick = function(event) {
            event.preventDefault();
            console.log("click")
            router.navigate('/sign-in')
          }
    }
}

window.customElements.define('register-form',RegisterForm)