$(function(){
  function buildHTML(message){
    var image_url = (message.image_url)? `<image class="lower-message_image" src="${message.image_url}">`:"";
    var html = `<div class="message" id='${message.id}'>
      <div class="upper-message" >
        <div class="upper-message__name">
          ${message.name}
      </div>
        <div class="upper-message__time">
          ${message.time}
      </div>
    </div>
      <div class="lower-message">
        <p class="lower-message__content"></p>
          ${message.content}
          ${image_url}
      </div>`
    return html;
  }
  function always(){
    $('.form__submit').prop('disabled',false)
  }
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.form__message').val('');
      $('.hidden').val('');
      always()
      $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight},'fast');
    })
    .fail(function(data){
      alert('error');
      always()
    })
  });
});
