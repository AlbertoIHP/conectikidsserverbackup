import { success, notFound } from '../../services/response/'
import { Tasks } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Tasks.create(body)
    .then((tasks) => tasks.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Tasks.count(query)
    .then(count => Tasks.find(query, select, cursor)
      .then((tasks) => ({
        count,
        rows: tasks.map((tasks) => tasks.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Tasks.findById(params.id)
    .then(notFound(res))
    .then((tasks) => tasks ? tasks.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Tasks.findById(params.id)
    .then(notFound(res))
    .then((tasks) => tasks ? Object.assign(tasks, body).save() : null)
    .then((tasks) => tasks ? tasks.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Tasks.findById(params.id)
    .then(notFound(res))
    .then((tasks) => tasks ? tasks.remove() : null)
    .then(success(res, 204))
    .catch(next)



export const getTasksByCourseId = ({ params }, res, next) => 
  Tasks.find().where('course_id')
    .equals(params.id)
    .then(notFound(res))
    .then( async function( tasks ){

       let respuesta = { courseTasks: tasks.map((tasks) => tasks.view()) }

       // for( let i = 0 ; i < respuesta.teacherCourses.length ; i ++ )
       // {
       //   await Gardens.findById( respuesta.teacherCourses[i].garden_id ).then( (gardens) => {

       //      respuesta.teacherCourses[i].garden_id = gardens.view()

       //      User.findById( respuesta.teacherCourses[i].teacher_id ).then( (user) => {
       //          respuesta.teacherCourses[i].teacher_id = user.view()
       //        })

       //    })      
       // }

      return  respuesta        
    })
    .then(success(res))
    .catch(next)