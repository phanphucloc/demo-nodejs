const $form = $('.needs-validation');
const $buttonComeBack = $('.js-button-come-back');
const $buttonSubmit = $('.js-button-submit');
const $nameRoomInput = $('.js-name-room');
const $descriptionInput = $('.js-description');

window.addEventListener('load', function () {

    $form.validate({
        onfocusout: false,
        onkeyup: false,
        onclick: false,
        rules: {
            "name-room": {
                required: true,
                maxlength: 50
            },
            "description": {
                required: true,
                maxlength: 500
            },
        },
        messages: {
            "name-room": {
                required: "Vui lòng nhập tên phòng",
                maxlength: "Tên phòng không được quá 50 kí tự"
            },
            "description": {
                required: "Vui lòng nhập mô tả",
                maxlength: "Mô tả phòng không được quá 500 kí tự"
            },
        },
        submitHandler: function (form) {

            let cookies = getCookie('Authorization');

            let data = {
                nameRoom: $nameRoomInput.val(),
                description: $descriptionInput.val(),
            };

            createChatRoom(data, cookies);
        }
    });

    $buttonComeBack.on('click', function () {
        window.location.href = '/chat-room/list-chat-room';
    })

    function createChatRoom(data, cookies) {

        const loadingButtonLogin = new Loading($buttonSubmit[0], 20, true);

        $.ajax({
            type: 'POST',
            url: '/chat-room/edit-chat-room/'+ idRoom,
            headers: {
                'Authorization': cookies,
            },
            data: JSON.stringify(data),
            contentType: 'application/json',
            beforeSend: function () {

                loadingButtonLogin.showLoadingElement();

            },
            success: function () {

                Swal.fire(
                    'Thông báo',
                    'Phòng chat đã được cập nhật.',
                    'success'
                )

                window.location.href = '/chat-room/list-chat-room';

            },
            error: function(){

                Swal.fire(
                    'Thông báo',
                    'Đã có lỗi xãy ra.',
                    'error'
                )

            },
            complete: function () {

                loadingButtonLogin.hideLoadingElement();

            }
        })
    }
}, false);