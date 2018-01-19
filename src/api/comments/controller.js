import { success, notFound } from '../../services/response/'
import { Comments } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Comments.create(body)
    .then((comments) => comments.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Comments.count(query)
    .then(count => Comments.find(query, select, cursor)
      .then((comments) => ({
        count,
        rows: comments.map((comments) => comments.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Comments.findById(params.id)
    .then(notFound(res))
    .then((comments) => comments ? comments.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Comments.findById(params.id)
    .then(notFound(res))
    .then((comments) => comments ? Object.assign(comments, body).save() : null)
    .then((comments) => comments ? comments.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Comments.findById(params.id)
    .then(notFound(res))
    .then((comments) => comments ? comments.remove() : null)
    .then(success(res, 204))
    .catch(next)
