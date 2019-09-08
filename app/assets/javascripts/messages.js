$(function(){
  function buildHTML(message) {
    var html = `<div class='message'>
    <div class='upper-message'>
    <div class='upper-message__user-name'>
    ${message.user_name}
    </div>
    <div class='upper-message__date'>
    ${message.date}
    </div>
    </div>
    <div class='lower-message'>
    <p class='lower-message__content'>
    ${message.content}
    </p>
    ${message.image}
    </div>
    </div>`
  return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var message = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: message,
      dataType: 'json',
      processData: false,
      contentType:false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html);
      $("form")[0].reset(); 
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'slow');
      
      })
    
    
    
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(data){
      $("input[type='submit']").attr('disabled', false);
  })
  })
});