import http from 'http'
import { env, mongo, port, ip, apiRoot } from './config'
import mongoose from './services/mongoose'
import express from './services/express'
import api from './api'

const app = express(apiRoot, api)
const server = http.createServer(app)

/**
** SOCKET 
**/

import socketio from 'socket.io'
const websocket = socketio(server)



websocket.on( 'connection', (socket) => {

// Aqui se definen todos los eventos que cualquier cliente escucha, broadcast emite el evento a TODOS los clientes, mientras
// que emit, solo lo emite al cliente que ha gatillado el evento 

   socket.on( 'taskAdded', ( task ) =>  {
       socket.broadcast.emit('taskAdded', task)  
       socket.emit( 'taskAdded', task )     
   })

   socket.on( 'activityAdded', ( activity ) =>  {
       socket.broadcast.emit('activityAdded', activity)  
       socket.emit( 'activityAdded', activity )     
   })

   socket.on( 'commentAdded', ( comment ) =>  {
       socket.broadcast.emit('commentAdded', comment)  
       socket.emit( 'commentAdded', comment )     
   })


   socket.on( 'chatAdded', ( chat ) =>  {
       socket.broadcast.emit( 'chatAdded', chat )  
       socket.emit( 'chatAdded', chat )     
   })

   socket.on( 'message', ( messages ) =>  {
       socket.broadcast.emit( 'message', messages )  
       socket.emit( 'message', messages )     
   })


})


mongoose.connect(mongo.uri, { useMongoClient: true })
mongoose.Promise = Promise

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })
})

export default app
