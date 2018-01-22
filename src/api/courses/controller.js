import { success, notFound } from '../../services/response/'
import { Courses } from '.'
import { Gardens } from '../gardens'
import { User } from '../user'

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




/**
**  Este metodo busca en la base de datos todos los cursos que un profesor tiene inscritos
**/


export const getCoursesByUserId = ({ params }, res, next) => 
  Courses.find().where('teacher_id')
    .equals(params.id)
    .then(notFound(res))
    .then( async function(courses){

       let respuesta = {teacherCourses: courses.map((courses) => courses.view()) }

       for( let i = 0 ; i < respuesta.teacherCourses.length ; i ++ )
       {
         await Gardens.findById( respuesta.teacherCourses[i].garden_id ).then( (gardens) => {

            respuesta.teacherCourses[i].garden_id = gardens.view()

           User.findById( respuesta.teacherCourses[i].teacher_id ).then( (user) => {
              respuesta.teacherCourses[i].teacher_id = user.view()

              console.log(teacherCourses[i])
            })

          })

      
       }

        return  respuesta        
    })
    .then(success(res))
    .catch(next)