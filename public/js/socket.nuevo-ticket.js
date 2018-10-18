// Comando para establecer la comunicación

var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log("Conectado al servidor");
});

socket.on('disconnect', function() {
    console.log("desConectado al servidor");
});

socket.on('estadoActual', (ticketActual) => {
    label.text(ticketActual.actual);
});

$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(sgteTicket) {
        label.text(sgteTicket);
    });
});