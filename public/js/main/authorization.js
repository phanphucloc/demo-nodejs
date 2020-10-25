function loginJson(email, password) {
    const buttonLogin = $('#button-submit-json')[0];
    const loadingButtonLogin = new Loading(buttonLogin,20,true);

    loadingButtonLogin.showLoadingElement();
    $.ajax({
        type: 'POST',
        url: 'login-json',
        data: JSON.stringify({
            email,
            password
        }),
        dataType: 'Json',
        contentType: 'application/json',
        success: function (result) {
            alert('Đăng nhập thành công');
            setCookie('Authorization', result.token, 1);
            window.location.href = '/dashboard';
        },
        complete: function (params) {
            loadingButtonLogin.hideLoadingElement();
        }
    })
}

function logout(){
    const cookies =  getCookie('Authorization');

    $.ajax({
        type: 'POST',
        url: '/logout',
        headers: {
            'Authorization': cookies,
        },
        contentType: 'application/json',
        success: function () {
            alert('Đăng xuất thành công');
            deleteCookie('Authorization');
            window.location.reload();
        },
        complete: function () {
        }
    })
}