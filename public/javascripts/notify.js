
window.notify = function (msg, type) {
        $('#notify_message').removeClass()
        $('#notify_message').addClass('notify_message-'+type)
        $('#notify_message').html('<center>'+msg+'</center>');
        $('#notify_message').slideDown(600).delay(3000).slideUp(600, function(){

        });

}
