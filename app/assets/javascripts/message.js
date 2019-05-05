$(function(){
  function buildHTML(message_json){
    var image_url = (message_json.image_url)? `<image class="lower-message_image" src="${message_json.image_url}">`:"";
    var html = `<div class="message" id='${message_json.id}'>
      <div class="upper-message" >
        <div class="upper-message__name">
          ${message_json.name}
      </div>
        <div class="upper-message__time">
          ${message_json.time}
      </div>
    </div>
      <div class="lower-message">
        <p class="lower-message__content"></p>
          ${message_json.content}
          ${image_url}
      </div>`
    return html;
  }
    function always(){
      $('.form__submit').prop('disabled',false);
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
    .fail(function(){
      alert('error');
      always()
    })
  });
});
