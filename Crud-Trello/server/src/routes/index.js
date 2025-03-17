const trelloRouter = require('./trello')
const cardRouter = require('./card')

function route(app) {   
    app.use('/', trelloRouter)
    app.use('/cards', cardRouter)
}

module.exports = route;

