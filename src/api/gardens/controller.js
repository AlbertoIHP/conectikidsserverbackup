import { success, notFound } from '../../services/response/'
import { Gardens } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Gardens.create(body)
    .then((gardens) => gardens.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Gardens.count(query)
    .then(count => Gardens.find(query, select, cursor)
      .then((gardens) => ({
        count,
        rows: gardens.map((gardens) => gardens.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Gardens.findById(params.id)
    .then(notFound(res))
    .then((gardens) => gardens ? gardens.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Gardens.findById(params.id)
    .then(notFound(res))
    .then((gardens) => gardens ? Object.assign(gardens, body).save() : null)
    .then((gardens) => gardens ? gardens.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Gardens.findById(params.id)
    .then(notFound(res))
    .then((gardens) => gardens ? gardens.remove() : null)
    .then(success(res, 204))
    .catch(next)
