import { success, notFound } from '../../services/response/'
import { Childrens } from '.'
import { User } from '../user'

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


export const getChildrensByParentId = ({ params }, res, next) => 
  Childrens.find().where('parent_id')
    .equals(params.id)
    .then(notFound(res))
    .then( async function( childrens )
    {
      let respuesta = { childrensCourse: childrens.map((childrens) => childrens.view()) }


      return respuesta

    })
    .then(success(res))
    .catch(next)





export const getChildrensParentByCourseId = ({ params }, res, next) => 
  Childrens.find().where('course_id')
    .equals(params.id)
    .then(notFound(res))
    .then( async function( childrens )
    {
      let respuesta = { childrensCourse: childrens.map((childrens) => childrens.view()) }

      let parents = []

      for( let children of respuesta.childrensCourse )
      {
        parents.push( {id: children.parent_id } )
      }


      let newArray = []
      let lookupObject = {}

      for( let i in parents )
      {
        lookupObject[parents[i]['id']] = parents[i]
      }

      for( let i in lookupObject )
      {
        newArray.push(lookupObject[i]);
      }

      respuesta = { parentsArray: [] }

      for( let i in newArray )
      {
        await User.findById(newArray[i].id)
                    .then(notFound(res))
                    .then( async (user) => {
                      respuesta.parentsArray.push( user.view() )
                    })
                    .then(success(res))
                    .catch(next)
      }


      return respuesta

    })
    .then(success(res))
    .catch(next)


