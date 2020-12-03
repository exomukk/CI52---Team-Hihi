import { validateEmail } from "./validateEmail.js";
import { showValidate, hideValidate } from "./toggleValidate.js";
let btn = document.getElementById("login-btn");

function md5(password) {
  return CryptoJS.MD5(password).toString();
}

let btnClick = async (event) => {
  event.preventDefault();
  let $email = document.getElementById("email");
  let $password = document.getElementById("pass");
  // console.log($email, $password, $passwordConfirm);
  let checkEmail = validateEmail($email.value);
  let checkEmpty = (str) => {
    if (str == "") return false;
    return true;
  };

  if (!checkEmail) {
    showValidate($email);
  } else hideValidate($email);

  if (!checkEmpty($password.value)) {
    showValidate($password);
  } else {
    hideValidate($password);
  }
  let isPassed = false;
  if (checkEmpty($password.value) && checkEmail) {
    isPassed = true;
  } else {
    console.log($password.value);
    console.log($email.value);
  }

  if (isPassed) {
    let result = await firebase
      .firestore()
      .collection("users")
      .where("email", "==", $email.value)
      .where("password", "==", md5($password.value))
      .get();

    if (result.empty) {
      alert("Email hoặc mật khẩu không chính xác");
      console.log(md5($password.value))
        console.log(firebase.firestore().collection("users").where("password", '==', md5($password.value)).get())
       
    } else {
         alert("Đăng nhập thành công");
    }
    // let result = await firebase
    //   .firestore()
    //   .collection("users")
    //   .where("email", "==", $email.value)
    //   .get();
    // console.log(result);
    // if (result.empty) {
    //   // lưu dữ liệu
    //   await firebase
    //     .firestore()
    //     .collection("users")
    //     .add({
    //       email: $email.value,
    //       password: md5($password.value),
    //     });

    //   alert("Đăng kí tài khoản thành công");
    // } else {
    //   alert("Email " + $email.value + " đã có người sử dụng!");
    // }
  }
};

btn.addEventListener("click", btnClick);
