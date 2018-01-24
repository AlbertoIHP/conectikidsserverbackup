import { success, notFound } from '../../services/response/'
import { Tags } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Tags.create(body)
    .then((tags) => tags.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Tags.count(query)
    .then(count => Tags.find(query, select, cursor)
      .then((tags) => ({
        count,
        rows: tags.map((tags) => tags.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Tags.findById(params.id)
    .then(notFound(res))
    .then((tags) => tags ? tags.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Tags.findById(params.id)
    .then(notFound(res))
    .then((tags) => tags ? Object.assign(tags, body).save() : null)
    .then((tags) => tags ? tags.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Tags.findById(params.id)
    .then(notFound(res))
    .then((tags) => tags ? tags.remove() : null)
    .then(success(res, 204))
    .catch(next)
