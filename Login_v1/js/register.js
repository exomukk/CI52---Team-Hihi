import { validateEmail } from "./validateEmail.js";
import {showValidate, hideValidate} from "./toggleValidate.js";
let btn = document.getElementById("signup-button");

function md5(password) {
  return CryptoJS.MD5(password).toString();
}

let btnClick = async (event) => {
  event.preventDefault();
  let $email = document.getElementById("email");
  let $password = document.getElementById("password");
  let $passwordConfirm = document.getElementById("passwordConfirm");
  // console.log($email, $password, $passwordConfirm);
  let checkEmail = validateEmail($email.value)
  let checkEmpty = (str) => {
    if(str == "" ) return false
    return true;
}

let checkPass = (pass, passConfirm) => {
  if(pass === passConfirm) return true
  else return false
}
  if(!checkEmail) {
    showValidate($email)
  }
  else hideValidate($email)
  if(!checkEmpty($password.value)) {
    showValidate($password)
  }
  else {
    hideValidate($password)
  }
  if(!checkEmpty($passwordConfirm.value)) {
    showValidate($passwordConfirm)
  }
  else {
    hideValidate($passwordConfirm)
  }
  if (checkPass($password.value, $passwordConfirm.value)) {
    hideValidate($passwordConfirm)
  }
  else showValidate($passwordConfirm)
  let isPassed = false;
  if(checkPass($password.value, $passwordConfirm.value) && checkEmail) {
      isPassed = true
  }
  else {
      console.log($password.value);
      console.log($passwordConfirm.value)
  }

  if (isPassed) {
    let result = await firebase
      .firestore()
      .collection("users")
      .where("email", "==", $email.value)
      .get();
    console.log(result);
    if (result.empty) {
      // lưu dữ liệu
      await firebase
        .firestore()
        .collection("users")
        .add({
          email: $email.value,
          password: md5($password.value),
        });

      alert("Đăng kí tài khoản thành công");
      window.open("login.html", "_self")
    } else {
      alert("Email " + $email.value + " đã có người sử dụng!");
    }
  }
};

btn.addEventListener("click", btnClick);
