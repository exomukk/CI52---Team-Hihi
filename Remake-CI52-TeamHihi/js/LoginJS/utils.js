export function checkInputWrapperValue($inputWrapper, condition, message) {
    let value = $inputWrapper.value;
    if (condition(value)) {
        $inputWrapper.error = message;
        return false;
    } else {
        $inputWrapper.error = "";
        return true;
    }
}

export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function validateStrongPassword(pwString) {
    var strength = 0;

    strength += /[A-Z]+/.test(pwString) ? 1 : 0;
    strength += /[a-z]+/.test(pwString) ? 1 : 0;
    strength += /[0-9]+/.test(pwString) ? 1 : 0;
    strength += /[\W]+/.test(pwString) ? 1 : 0;

    return strength >= 4;
}

export function md5(string) {
    return CryptoJS.MD5(string).toString();
}

// lưu trạng thái người dùng khi đăng nhập
export function makeAuth(user) {
    localStorage.removeItem('current-user')
    localStorage.setItem('current-user', JSON.stringify(user));
}

// kiểm tra trạng thái đăng nhập của người dùng, nếu có thì lấy ra thông tin người dùng đó
export function auth() {
    if (localStorage.getItem('current-user') != "")
        return JSON.parse(localStorage.getItem('current-user'));

    return false;
}

// xử lý dữ liệu trả về từ firebase
export function getDataFromDoc(doc, excepts = []) {
    // lấy dữ liệu từ doc
    let result = doc.data();
    result.id = doc.id;

    // loại những trường thông tin không cần thiết
    for(let except of excepts) {
        delete result[except];
    }

    return result;
}


export function getDataFromDocs(docs, excepts = []) {
    return docs.map(function(doc) {
        return getDataFromDoc(doc, excepts);
    }); 
}