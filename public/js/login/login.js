$('#login-json').on('submit', function (event) {
    event.preventDefault();
    let email = $('#login-json input[name=email]').val();
    let password = $('#login-json input[name=password]').val();
    loginJson(email, password)
})

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
            alert('Đăng hập thành công');
            setCookie('Authorization', result.token, 1);
        },
        complete: function (params) {
            loadingButtonLogin.hideLoadingElement();
        }
    })
}