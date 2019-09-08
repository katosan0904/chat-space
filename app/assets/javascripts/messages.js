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
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#message_content').val(''); 
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
