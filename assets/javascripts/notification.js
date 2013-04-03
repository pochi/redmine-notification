$(function(){
  var auth_key = $("#squall").val();
  var user_id = $("#user_id").val();
  var guest_id = $("#guest_id").val();

  var squall_client = new SquallClient("ws://localhost:8080/ws/guests/" + guest_id + "/websockets/" + user_id, auth_key);

  var notification = window.webkitNotifications;

  $("#activate").on("click", function() {
    window.webkitNotifications.requestPermission();
  });

  squall_client.onopen = function() {
    this.popup("title", "hogehoge");
  };

  squall_client.onmessage = function(event) {
    var message = eval("("+event.data+")");
    console.log(message);
    this.popup(message["author"], message["title"]+"を更新しました。");
    //window.webkitNotifications.createHTMLNotification("/squall/notification.html").show();
  };
});