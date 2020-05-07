$(function(){
  function buildHTML(message){
  	 image = ( message.image ) ? `<asset_path src=${message.image} >` : "";
  	  var html =
  	  `<div class="main__message__box">
  <div class="main__message__box__top">
    <div class="main__message__box__top__name">
      ${message.user_name}
    </div>
    <div class="main__message__box__top__time">
      ${message.date}
    </div>
  </div>
  <div class="main__message__box__text">
      <p class="lower-message__content">
        ${message.content}
      </p>
  </div>
   ${image}
</div>`
return html;

}


  $('#new_message').on('submit',function(e) {
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
	  	$('.main__message').append(html);
	  	$('.main__message__box').animate({scrollTop: $('.main__message__box')[0].scrollHeight}, 'fast');
	  	$('.main__footer__text').val('');
	  	$(".main__footer__send-button").prop('disabled', false);
	})
	.fail(function(){
	    alert('error');
	});
  });
});