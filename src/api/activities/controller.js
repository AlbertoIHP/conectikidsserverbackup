import { success, notFound } from '../../services/response/'
import { Activities } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Activities.create(body)
    .then((activities) => activities.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Activities.count(query)
    .then(count => Activities.find(query, select, cursor)
      .then((activities) => ({
        count,
        rows: activities.map((activities) => activities.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Activities.findById(params.id)
    .then(notFound(res))
    .then((activities) => activities ? activities.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Activities.findById(params.id)
    .then(notFound(res))
    .then((activities) => activities ? Object.assign(activities, body).save() : null)
    .then((activities) => activities ? activities.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Activities.findById(params.id)
    .then(notFound(res))
    .then((activities) => activities ? activities.remove() : null)
    .then(success(res, 204))
    .catch(next)
