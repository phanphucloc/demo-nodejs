const $table = $('.js-table-responsive');

const $buttonAdd = $('.btn.js-add');
const $buttonDeleteAll = $('.btn.js-delete-all');

const $iconJoinRoom = $('.js-icon.join-room');
const $iconDelete = $('.js-icon.js-delete');
const $iconEdit = $('.js-icon.js-edit');

const $inputCheckAll = $('#js-check-all');
const $inputChecks = $('.js-check');

let idRoomChecks = [];
const loadingTable = new Loading($table[0], 20, true);;

$(document).on('click', '.btn.js-add' , function(){
  window.location.href = '/chat-room/add-chat-room';
})

$(document).on('click', '.btn.js-delete-all' , function(){
  
  Swal.fire({
    title: 'Bạn có chắc',
    text: "Bạn sẽ không thể hoàn nguyên điều này!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Đúng, xóa nó!',
    cancelButtonText: 'Hủy'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteAllRoom();
    }
  })

})

$(document).on('click', '.js-icon.join-room' , function(){
  window.location.href = '/chat-room/chat-room-live';
})

$(document).on('click', '.js-icon.js-edit' , function(event){
  var roomId = getIdRoomByElement($(event.currentTarget));
  window.location.href = '/chat-room/edit-chat-room/' + roomId;
})

$(document).on('click', '.js-icon.js-delete' , function(event){
  const $thisElementIcon = $(event.currentTarget);

  Swal.fire({
    title: 'Bạn có chắc',
    text: "Bạn sẽ không thể hoàn nguyên điều này!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Đúng, xóa nó!',
    cancelButtonText: 'Hủy'
  }).then((result) => {
    if (result.isConfirmed) {
      
      deleteRoom($thisElementIcon);
    }
  })

})

$(document).on('click', '.js-check' , function(event){
  
  const $thisInputCheck = $(event.currentTarget);
  const isChecked = $thisInputCheck.prop('checked');
  const id = getIdRoomByElement($thisInputCheck);

  if (isChecked) {

    const index = idRoomChecks.findIndex(function (_id) {
      return _id === id
    })

    if (index < 0) {
      idRoomChecks.push(id);
    }

  } else {

    const index = idRoomChecks.findIndex(function (_id) {
      return _id === id
    })

    if (index >= 0) {
      idRoomChecks.splice(index, 1);
    }

  }
  
  console.log(idRoomChecks);
})

$(document).on('click', '#js-check-all' , function(event){
  
  const $thisInputCheckAll = $(event.currentTarget);
  const isChecked = $thisInputCheckAll.prop('checked');
  const ids = getIdsRoomByElements($inputChecks);

  if (isChecked) {

    ids.forEach(function (id) {

      const index = idRoomChecks.findIndex(function (_id) {
        return _id === id
      })

      if (index < 0) {
        idRoomChecks.push(id);
      }

    })

    $inputChecks.prop('checked', true);

  } else {

    ids.forEach(function (id) {

      const index = idRoomChecks.findIndex(function (_id) {
        return _id === id
      })

      if (index >= 0) {
        idRoomChecks.splice(index, 1);
      }

    })

    $inputChecks.prop('checked', false);

  }

})


function deleteRoom($elementIcon) {
  console.log($elementIcon);
  const cookies = getCookie('Authorization');
  const id = getIdRoomByElement($elementIcon)

  $.ajax({
    type: 'POST',
    url: '/chat-room/delete-chat-rooms',
    headers: {
      'Authorization': cookies,
    },
    data: JSON.stringify({
      ids: [id]
    }),
    contentType: 'application/json',
    beforeSend: function () {

      loadingTable.showLoadingElement();

    },
    success: function () {

      Swal.fire(
        'Đã xóa!',
        'Đã xóa thành công',
        'success'
      )

      removeValueInArray(idRoomChecks, id);

      getChatRooms();

    },
    error: function () {

      Swal.fire(
        'Thông báo',
        'Đã có lỗi xãy ra.',
        'error'
      )

    },
  })

}

function deleteAllRoom() {

  const cookies = getCookie('Authorization');

  $.ajax({
    type: 'POST',
    url: '/chat-room/delete-chat-rooms',
    headers: {
      'Authorization': cookies,
    },
    data: JSON.stringify({
      ids: idRoomChecks
    }),
    contentType: 'application/json',
    beforeSend: function () {

      loadingTable.showLoadingElement();

    },
    success: function () {

      Swal.fire(
        'Đã xóa!',
        'Đã xóa tất cả lựa chọn của bạn',
        'success'
      )

      idRoomChecks = [];

      getChatRooms();

    },
    error: function () {

      Swal.fire(
        'Thông báo',
        'Đã có lỗi xãy ra.',
        'error'
      )

    },
  })
}

function getChatRooms() {
  const cookies = getCookie('Authorization');

  $.ajax({
    type: 'POST',
    url: '/chat-room/get-chat-rooms',
    headers: {
      'Authorization': cookies,
    },
    data: JSON.stringify({
      ids: idRoomChecks
    }),
    contentType: 'application/json',
    beforeSend: function () {

      loadingTable.showLoadingElement();

    },
    success: function (res) {
      const chatRooms = res.chatRooms;
      const $tbodyTable = $table.find('tbody');
      
      $tbodyTable.html('');

      chatRooms.forEach(function (chatRoom) {

        const html = `<tr id-room="${chatRoom._id}">
                                        <td>
                                            <input type="checkbox" class="js-check" id="check-${chatRoom._id}">
                                        </td>
                                        <td data-toggle="tooltip" data-placement="top" data-original-title="${chatRoom.description}">
                                            ${chatRoom.nameRoom}
                                        </td>
                                        <td>${chatRoom.ownRoomName}</td>
                                        <td>${chatRoom.numberOnline}</td>
                                        <td>
                                            <div class="icons">
                                                <i class="icon js-icon join-room fas fa-play icon-join-room text-primary" data-toggle="tooltip" data-placement="top" data-original-title="Vào phòng">
                                                </i>
                                                <i class="icon js-icon js-edit fas fa-pencil-alt text-warning" data-toggle="tooltip" data-placement="top" data-original-title="Sửa phòng">
                                                </i>
                                                <i class="icon js-icon js-delete fas fa-trash text-danger" data-toggle="tooltip" data-placement="top" data-original-title="xóa phòng">
                                                </i>
                                            </div>
                                        </td>
                                    </tr>`
        $tbodyTable.append(html);
      })

      console.log(res);

    },
    error: function () {

      Swal.fire(
        'Thông báo',
        'Đã có lỗi xãy ra.',
        'error'
      )

    },
    complete: function () {

      loadingTable.hideLoadingElement();

    }
  })
}

function getElementTrByElementChild($element) {
  return $element.parents('tr:first');
}

function getIdRoomByElement($element) {
  const elementTr = getElementTrByElementChild($element);
  return elementTr.attr('id-room');
}

function getIdsRoomByElements($elements = []) {

  let ids = [];

  $elements.each(function (index, element) {
    const $element = $(element);
    const id = getIdRoomByElement($element);
    ids.push(id);
  })

  return ids;

}