$(function(){
  function buildHTML(message){
    var image = message.image_url ? `<img class= "lower-message__image" src="${message.image_url}">` : "" ;

    var html = `<div class="message" data-message_id="${message.id}">
                  <div class="message__upper-info">
                    <div class="message__upper-info__talker">
                      ${message.user_name}
                    </div>
                    <div class="message__upper-info__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="message__text">
                    <p class="message__text">
                      ${message.body}
                    </p>
                    ${image}
                  </div>
                </div>`
    return html;
  }
  $('.new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast');
      $('#new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
      $('.form__submit').prop('disabled', false);
    })
    .always(function(data){
      $('.submit-btn').prop('disabled', false);
    })
  });
});