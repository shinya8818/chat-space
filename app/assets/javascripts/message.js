$(function() {
  function buildHTML(message){
    var html = `<div class="message">
    <div class="upper-message">
        <div class="upper-message__name">
            ${ message.user.name }
        </div>
        <div class="upper-message__time">
            ${ message.created_at.to_s }
        </div>
    </div>
    <div class="lower-message">
        <p class="lower-message__content">
            ${ message.content }
        </p>
    </div>
</div>`;
  return html;
  }
  function scroll() {
    $('.messages').animate({scrollTop: $(".message")[0].scrollHeight});
  }
  $('#new__message').on('submit',function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    $.ajax({
      type: "POST",
      data: formData,
      dataType: "json",
      url: "/groups/group.id/messages",
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.form__message').val("");
      $('.form__submit').prop('disabled', false);
      scroll();
    })
    .fail(function(){
      alert('eeror')
    })
  })
})
