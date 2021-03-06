import { success, notFound } from '../../services/response/'
import { Messages } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Messages.create(body)
    .then((messages) => messages.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Messages.count(query)
    .then(count => Messages.find(query, select, cursor)
      .then((messages) => ({
        count,
        rows: messages.map((messages) => messages.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Messages.findById(params.id)
    .then(notFound(res))
    .then((messages) => messages ? messages.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Messages.findById(params.id)
    .then(notFound(res))
    .then((messages) => messages ? Object.assign(messages, body).save() : null)
    .then((messages) => messages ? messages.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Messages.findById(params.id)
    .then(notFound(res))
    .then((messages) => messages ? messages.remove() : null)
    .then(success(res, 204))
    .catch(next)



/**
**  Este metodo busca en la base de datos todas las actividades de un curso
**/


export const getMessagesByCourseId = ({ params }, res, next) => 
  Messages.find().where('chat_id')
    .equals(params.id)
    .then(notFound(res))
    .then( async function( messages )
    {
      let respuesta = { chatMessagess: messages.map((messages) => messages.view()) }

      return  respuesta  

    })
    .then(success(res))
    .catch(next)
