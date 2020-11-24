var chatform = document.getElementById('chat-form');

    // 
    chatform.addEventListener('submit', function(e) {
        e.preventDefault(); // prevents page reloading
        //send the value of the input to server through socket
        socket.emit('submitted_message', $('#chat-input').val());
        $('#chat-input').val(''); //empty the input field for any new message to b typed
        return false;
    });

    // when 'chat_message' event is received, append message received from server username
    socket.on('submitted_message', function(msg) {
        $('#messages').append($('<li>').html(msg));
    });

    // when receiving th 'on_line' event, append text with username
    socket.on('participant', function(username) {
        $('#messages').append($('<li>').html(username));
    });




