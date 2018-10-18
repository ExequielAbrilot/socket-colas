const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');

        if (this.hoy === data.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }
    }
    siguiente() {
        this.ultimo++;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket ${ this.ultimo }`;
    }
    getultimoTicket() {
        return `Ticket ${ this.ultimo }`;
    }
    getultimos4() {
        if (!this.ultimos4) {
            return 'No hay tickets en cola';
        }
        return this.ultimos4;
    }
    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay ticket';
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        this.ultimos4.unshift(atenderTicket);
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); // elimina ultimo elemento
        }

        console.log("ultimos 4");
        console.log(this.ultimos4);

        this.grabarArchivo();
        return atenderTicket;
    }
    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        this.grabarArchivo();
    }

    grabarArchivo() {
        let json_ = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }

        let jsonFinal_ = JSON.stringify(json_);
        fs.writeFileSync('./server/data/data.json', jsonFinal_);
    }
}

module.exports = {
    TicketControl
}