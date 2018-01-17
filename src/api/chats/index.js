import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Chats, { schema } from './model'

const router = new Router()
const { course_id, name } = schema.tree

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
  body({ course_id, name }),
  create)

/**
 * @api {get} /chats Retrieve chats
 * @apiName RetrieveChats
 * @apiGroup Chats
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of chats.
 * @apiSuccess {Object[]} rows List of chats.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /chats/:id Retrieve chats
 * @apiName RetrieveChats
 * @apiGroup Chats
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} chats Chats's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Chats not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /chats/:id Update chats
 * @apiName UpdateChats
 * @apiGroup Chats
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam course_id Chats's course_id.
 * @apiParam name Chats's name.
 * @apiSuccess {Object} chats Chats's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Chats not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ course_id, name }),
  update)

/**
 * @api {delete} /chats/:id Delete chats
 * @apiName DeleteChats
 * @apiGroup Chats
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Chats not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
