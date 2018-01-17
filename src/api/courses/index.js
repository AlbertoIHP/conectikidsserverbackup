import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Courses, { schema } from './model'

const router = new Router()
const { name, garden_id, teacher_id } = schema.tree

/**
 * @api {post} /courses Create courses
 * @apiName CreateCourses
 * @apiGroup Courses
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Courses's name.
 * @apiParam garden_id Courses's garden_id.
 * @apiParam teacher_id Courses's teacher_id.
 * @apiSuccess {Object} courses Courses's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Courses not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ name, garden_id, teacher_id }),
  create)

/**
 * @api {get} /courses Retrieve courses
 * @apiName RetrieveCourses
 * @apiGroup Courses
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of courses.
 * @apiSuccess {Object[]} rows List of courses.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /courses/:id Retrieve courses
 * @apiName RetrieveCourses
 * @apiGroup Courses
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} courses Courses's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Courses not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /courses/:id Update courses
 * @apiName UpdateCourses
 * @apiGroup Courses
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Courses's name.
 * @apiParam garden_id Courses's garden_id.
 * @apiParam teacher_id Courses's teacher_id.
 * @apiSuccess {Object} courses Courses's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Courses not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, garden_id, teacher_id }),
  update)

/**
 * @api {delete} /courses/:id Delete courses
 * @apiName DeleteCourses
 * @apiGroup Courses
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Courses not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
