import { success, notFound } from '../../services/response/'
import { Chatsusers } from '.'

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
