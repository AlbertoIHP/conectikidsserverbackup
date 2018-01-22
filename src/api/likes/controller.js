import { success, notFound } from '../../services/response/'
import { Likes } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Likes.create(body)
    .then((likes) => likes.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Likes.count(query)
    .then(count => Likes.find(query, select, cursor)
      .then((likes) => ({
        count,
        rows: likes.map((likes) => likes.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Likes.findById(params.id)
    .then(notFound(res))
    .then((likes) => likes ? likes.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Likes.findById(params.id)
    .then(notFound(res))
    .then((likes) => likes ? Object.assign(likes, body).save() : null)
    .then((likes) => likes ? likes.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Likes.findById(params.id)
    .then(notFound(res))
    .then((likes) => likes ? likes.remove() : null)
    .then(success(res, 204))
    .catch(next)
