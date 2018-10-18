const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        let siguienteTicket = ticketControl.siguiente()
        console.log(siguienteTicket);
        callback(siguienteTicket);
    });

    //Emitir evento estado actual
    client.emit('estadoActual', {
        actual: ticketControl.getultimoTicket(),
        ultimos4: ticketControl.getultimos4()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: "El escritorio es necesario"
            });

        }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);
        client.broadcast.emit('ultimos4', { ultimos4: ticketControl.getultimos4() });
    })




});