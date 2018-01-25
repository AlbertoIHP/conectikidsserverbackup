import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, index, show, update, destroy, getChatsByCourseId } from './controller'
import { schema } from './model'
export Chats, { schema } from './model'

const router = new Router()
const { course_id, name, description, picture } = schema.tree

/**
 * @api {post} /chats Create chats
 * @apiName CreateChats
 * @apiGroup Chats
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam course_id Chats's course_id.
 * @apiParam name Chats's name.
 * @apiSuccess {Object} chats Chats's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Chats not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ course_id, name, description, picture }),
  create)

/**
 * @api {get} /chats Retrieve chats
 * @apiName RetrieveChats
 * @apiGroup Chats
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of chats.
 * @apiSuccess {Object[]} rows List of chats.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /chats/getchatsbycourseid/:id Retrieve chats
 * @apiName RetrieveChats
 * @apiGroup Chats
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} chats Chats's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Chats not found.
 * @apiError 401 admin access only.
 */
router.get('/getchatsbycourseid/:id',
  token({ required: true }),
  getChatsByCourseId)




/**
 * @api {get} /chats/:id Retrieve chats
 * @apiName RetrieveChats
 * @apiGroup Chats
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} chats Chats's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Chats not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true }),
  show)







/**
 * @api {put} /chats/:id Update chats
 * @apiName UpdateChats
 * @apiGroup Chats
 * @apiParam {String} access_token admin access token.
 * @apiParam course_id Chats's course_id.
 * @apiParam name Chats's name.
 * @apiSuccess {Object} chats Chats's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Chats not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ course_id, name, description, picture }),
  update)

/**
 * @api {delete} /chats/:id Delete chats
 * @apiName DeleteChats
 * @apiGroup Chats
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Chats not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
