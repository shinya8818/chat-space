$(function() {
  $("#user-search-field").on("keyup",function(e) {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input},
      dataType: 'json'
    })
    .done(function(users) {
      if(users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーはいません")
      }
    })
    // .fail(function() {
    //   alert('error');
    // });
  });
});

