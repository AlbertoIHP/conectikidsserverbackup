import { success, notFound } from '../../services/response/'
import { Childrens } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Childrens.create(body)
    .then((childrens) => childrens.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Childrens.count(query)
    .then(count => Childrens.find(query, select, cursor)
      .then((childrens) => ({
        count,
        rows: childrens.map((childrens) => childrens.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Childrens.findById(params.id)
    .then(notFound(res))
    .then((childrens) => childrens ? childrens.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Childrens.findById(params.id)
    .then(notFound(res))
    .then((childrens) => childrens ? Object.assign(childrens, body).save() : null)
    .then((childrens) => childrens ? childrens.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Childrens.findById(params.id)
    .then(notFound(res))
    .then((childrens) => childrens ? childrens.remove() : null)
    .then(success(res, 204))
    .catch(next)
