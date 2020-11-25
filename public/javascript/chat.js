var chatform = document.getElementById('chat-form');
    chatform.addEventListener('submit', function(e) {
        e.preventDefault(); // prevents page reloading
        //send the value of the input to server through socket
        socket.emit('submitted_message', $('#chat-input').val());
        $('#chat-input').val(''); //empty the input field for any new message to be typed
        return false;
    });

    // when 'submitted_message' event is received, append message received from server username
    socket.on('submitted_message', function(msg) {
        $('#messages').append($('<li>').html(msg));
    });

    // when participant joins the game, append "... has joined the game".
    socket.on('participant', function(username) {
        $('#messages').append($('<li>').html(username));
    });




