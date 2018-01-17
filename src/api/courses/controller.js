import { success, notFound } from '../../services/response/'
import { Courses } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Courses.create(body)
    .then((courses) => courses.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Courses.count(query)
    .then(count => Courses.find(query, select, cursor)
      .then((courses) => ({
        count,
        rows: courses.map((courses) => courses.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Courses.findById(params.id)
    .then(notFound(res))
    .then((courses) => courses ? courses.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Courses.findById(params.id)
    .then(notFound(res))
    .then((courses) => courses ? Object.assign(courses, body).save() : null)
    .then((courses) => courses ? courses.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Courses.findById(params.id)
    .then(notFound(res))
    .then((courses) => courses ? courses.remove() : null)
    .then(success(res, 204))
    .catch(next)
