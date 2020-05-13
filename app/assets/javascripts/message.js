$(function(){
  function buildHTML(message){
    if ( message.image ) {
        //data-idが反映されるようにしている
        var html =
         `<div class="message" data-message-id=${message.id}>
            <div class="message__upper-info">
              <div class="message__upper-info__talker">
                ${message.user_name}
              </div>
              <div class="message__upper-info__date">
                ${message.created_at}
              </div>
            </div>
            <div class="message__text">
              <p class="lower-message__content">
                ${message.content}
              </p>
            </div>
            <img src=${message.image} >
          </div>`
        return html;
      } else {
        //同様にdata-idが反映されるようにしている
        var html =
         `<div class="message" data-message-id=${message.id}>
            <div class="message__upper-info">
              <div class="message__upper-info__talker">
                ${message.user_name}
              </div>
              <div class="message__upper-info__date">
                ${message.created_at}
              </div>
            </div>
            <div class="message__text">
              <p class="lower-message__content">
                ${message.content}
              </p>
            </div>
          </div>`
        return html;
      };
    }
  $('#new_message').on('submit',function(e){
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
    .fail(function(){
      alert('error');
      $('.form__submit').prop('disabled', false);
    })
  });

  var reloadMessages = function(){
    
      var last_message_id = $('.message:last').data("message_id");
      $.ajax({
        url: "api/messages",
        type: 'GET',
        data: {id: last_message_id},
        dataType: 'json'
      })
      .done(function(messages){
        var insertHTML = '';
        messages.forEach(function(message){
          insertHTML += buildHTML(message);
          $('.messages').append(insertHTML);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast');
        });
      })
      .fail(function() {
        alert('error');
      });
    };

 if (location.href.match(/groups\/\d+\/messages/)) {
  setInterval(reloadMessages, 5000);
};
});