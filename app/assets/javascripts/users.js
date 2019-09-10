$(function() {
  var search_list=$("#user-search-result");

function appendUser(user){
var user_id=user.id
var user_name=user.name
var html  = `<div class="chat-group-user clearfix">
<p class="chat-group-user__name">${user_name}</p>
<div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user_id} data-user-name="${user_name}">追加</div>`
search_list.append(html);
}


function appendErrMsgToHTML(msg){
  var html = `<div>
                ${msg}
              </div>`
  search_list.append(html);
}

function addgroup(nameVariable,idVariable){
var html=`<div class='chat-group-user'>
<input name='group[user_ids][]' type='hidden' value=${idVariable}>
<p class='chat-group-user__name'>"${nameVariable}"</p>
<div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id=${idVariable}>削除</div>
</div>`
$(".chat-group-users").append(html);
}





  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users){

      $("#user-search-result").empty();
      if(users.length !==0){
        users.forEach(function(user){
          appendUser(user);
        })
      }else{
        appendErrMsgToHTML("一致するユーザーはありません");
      }

    
    })    

    .fail(function(){
    alert('ユーザー検索に失敗しました')
    
    
    })

    
      
  })
  $(document).on("click", ".user-search-add", function(){
    var idVariable = $(this).data('user-id');
    var nameVariable = $(this).data('user-name');
    $(`.user-search-add[data-user-id=${idVariable}]`).parent().empty();
    addgroup(nameVariable,idVariable);
});
  $(document).on("click", ".user-search-remove", function(){
    var id = $(this).data('user-id');
    $(`.user-search-remove[data-user-id=${id}]`).parent().empty();
  });

});