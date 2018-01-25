import { success, notFound } from '../../services/response/'
import { Chatsusers } from '.'
import { Courses } from '../courses'

export const create = ({ bodymen: { body } }, res, next) =>
  Chatsusers.create(body)
    .then((chatsusers) => chatsusers.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Chatsusers.count(query)
    .then(count => Chatsusers.find(query, select, cursor)
      .then((chatsusers) => ({
        count,
        rows: chatsusers.map((chatsusers) => chatsusers.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Chatsusers.findById(params.id)
    .then(notFound(res))
    .then((chatsusers) => chatsusers ? chatsusers.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Chatsusers.findById(params.id)
    .then(notFound(res))
    .then((chatsusers) => chatsusers ? Object.assign(chatsusers, body).save() : null)
    .then((chatsusers) => chatsusers ? chatsusers.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Chatsusers.findById(params.id)
    .then(notFound(res))
    .then((chatsusers) => chatsusers ? chatsusers.remove() : null)
    .then(success(res, 204))
    .catch(next)

/**
**  Este metodo busca en la base de datos todas las actividades de un curso
**/


export const getChatsByUserAndCourseId = ({ params }, res, next) => 
  Chatsusers.find().where('user_id')
    .equals(params.id.split('&')[1])
    .then(notFound(res))
    .then( async function( chats )
    {
      console.log("parametros del request: ",params)
      console.log(" Esto entrego la BD: ", chats)
      let respuesta = { userChats: chats.map((chats) => chats.view()) }



      console.log("Respuesta de la BD ",respuesta)
      respuesta = respuesta.userChats.filter( chat => chat.course_id === params.id.split('&')[0] )

      console.log(" Filtrado por la id del curso ", respuesta)

      return  { userChats: respuesta }  

    })
    .then(success(res))
    .catch(next)