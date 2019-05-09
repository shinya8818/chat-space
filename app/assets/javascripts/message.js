$(document).on('turbolinks:load', function(){
  $(function(){
    function buildHTML(message){
      console.log(message)
      var image_url = (message.image)? `<image class="lower-message__image" src="${message.image.url}">`:"";
        if(message.image) {
          var html = `<div class="message" data-messageId='${message.id}' data-groundId="${message.group_id}">
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
    } else {
      var html =  `<div class="message" data-messageId='${message.id}' data-groundId="${message.group_id}">
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
      </div>`
      return html;
    };
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
        $('#new_message')[0].reset();
        always()
        $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight},'fast');
      })
      .fail(function(){
        alert('error');
        always()
      })
    });

    var reloadMessages = function() {
      var last_message_id = $('.message').last().attr("data-messageId");
      var groupId = $('.message').attr("data-groupId");
      $.ajax ({
        url: '/groups/' + groupId + '/api/messages',
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(data) {
        $.each(data,function(i,message){
          var insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
          $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight+100}, "fast");
        })
      })
      .fail(function() {
        console.log('error');
      });
    };
    setInterval(reloadMessages, 5000);
  });
});
