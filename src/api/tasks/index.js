import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, index, show, update, destroy, getTasksByCourseId } from './controller'
import { schema } from './model'
export Tasks, { schema } from './model'

const router = new Router()
const { name, description, selectedDate, timeof, course_id, createdBy_id } = schema.tree

/**
 * @api {post} /tasks Create tasks
 * @apiName CreateTasks
 * @apiGroup Tasks
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Tasks's name.
 * @apiParam description Tasks's description.
 * @apiParam selectedDate Tasks's selectedDate.
 * @apiParam timeof Tasks's timeof.
 * @apiParam course_id Tasks's course_id.
 * @apiSuccess {Object} tasks Tasks's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tasks not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ name, description, selectedDate, timeof, course_id, createdBy_id }),
  create)

/**
 * @api {get} /tasks Retrieve tasks
 * @apiName RetrieveTasks
 * @apiGroup Tasks
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of tasks.
 * @apiSuccess {Object[]} rows List of tasks.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /tasks/:id Retrieve tasks
 * @apiName RetrieveTasks
 * @apiGroup Tasks
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} tasks Tasks's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tasks not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true }),
  show)


/**
 * @api {get} /tasks/gettasksbycourseid/:id Retrieve tasks
 * @apiName RetrieveTasks
 * @apiGroup Tasks
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} tasks Tasks's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tasks not found.
 * @apiError 401 admin access only.
 */
router.get('/gettasksbycourseid/:id',
  token({ required: true }),
  getTasksByCourseId)


/**
 * @api {put} /tasks/:id Update tasks
 * @apiName UpdateTasks
 * @apiGroup Tasks
 * @apiParam {String} access_token admin access token.
 * @apiParam name Tasks's name.
 * @apiParam description Tasks's description.
 * @apiParam selectedDate Tasks's selectedDate.
 * @apiParam timeof Tasks's timeof.
 * @apiParam course_id Tasks's course_id.
 * @apiSuccess {Object} tasks Tasks's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tasks not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, description, selectedDate, timeof, course_id, createdBy_id }),
  update)

/**
 * @api {delete} /tasks/:id Delete tasks
 * @apiName DeleteTasks
 * @apiGroup Tasks
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Tasks not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
