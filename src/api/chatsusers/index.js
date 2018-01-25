import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, index, show, update, destroy, getChatsByCourseId } from './controller'
import { schema } from './model'
export Chatsusers, { schema } from './model'

const router = new Router()
const { chat_id, user_id } = schema.tree

/**
 * @api {post} /chatsusers Create chatsusers
 * @apiName CreateChatsusers
 * @apiGroup Chatsusers
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam chat_id Chatsusers's chat_id.
 * @apiParam user_id Chatsusers's user_id.
 * @apiSuccess {Object} chatsusers Chatsusers's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Chatsusers not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ chat_id, user_id }),
  create)

/**
 * @api {get} /chatsusers Retrieve chatsusers
 * @apiName RetrieveChatsusers
 * @apiGroup Chatsusers
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of chatsusers.
 * @apiSuccess {Object[]} rows List of chatsusers.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /chatsusers/getchatsbycourseanduserid/:id Retrieve chatsusers
 * @apiName RetrieveChatsusers
 * @apiGroup Chatsusers
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} chatsusers Chatsusers's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Chatsusers not found.
 * @apiError 401 admin access only.
 */
router.get('/getchatsbycourseanduserid/:id',
  token({ required: true }),
  getChatsByUserAndCourseId)


/**
 * @api {get} /chatsusers/:id Retrieve chatsusers
 * @apiName RetrieveChatsusers
 * @apiGroup Chatsusers
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} chatsusers Chatsusers's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Chatsusers not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true }),
  show)


/**
 * @api {put} /chatsusers/:id Update chatsusers
 * @apiName UpdateChatsusers
 * @apiGroup Chatsusers
 * @apiParam {String} access_token admin access token.
 * @apiParam chat_id Chatsusers's chat_id.
 * @apiParam user_id Chatsusers's user_id.
 * @apiSuccess {Object} chatsusers Chatsusers's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Chatsusers not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ chat_id, user_id }),
  update)

/**
 * @api {delete} /chatsusers/:id Delete chatsusers
 * @apiName DeleteChatsusers
 * @apiGroup Chatsusers
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Chatsusers not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
