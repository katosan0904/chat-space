$(function(){
  if (document.URL.match("/messages")) {
    function buildHTML(message){
    var content= message.content? message.content :""
    var image= message.image? `<img src=${message.image.url}  class="lower-message__image" ,data-id='${message.id}></img>` :`<div class="no-image",data-id='${message.id}></div>`

      var html = `<div class="message" data-id='${message.id}'>
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name}
          </div>
          <div class="upper-message__date">
            ${message.date}
          </div>
        </div>
        <div class="lower-message">
        <p class='lower-message__content' data-id=${message.id}>
            ${content}
          </p>
          ${image}
        </div>
      </div>`
      
    return html;
  };
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

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
   var id = $('.lower-message__content:last').data('id');
   last_message_id = id
   
      $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: 'api/messages' ,
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: "GET",
      dataType: "json",
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    }) 
    .done(function(messages) {
      var insertHTML = '';
       (messages).forEach(function(message){
      var html=buildHTML(message)
      $('.messages').append(html)
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
     
      })
      
    })
    
    .fail(function() {
      alert('error');
    });
  }
  setInterval(reloadMessages, 5000);
};
});
