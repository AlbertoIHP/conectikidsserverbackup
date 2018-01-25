import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, index, show, update, destroy, getMessagesByCourseId } from './controller'
import { schema } from './model'
export Messages, { schema } from './model'

const router = new Router()
const { text, user, chat_id, createdAt } = schema.tree

/**
 * @api {post} /messages Create messages
 * @apiName CreateMessages
 * @apiGroup Messages
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam content Messages's content.
 * @apiParam sender_id Messages's sender_id.
 * @apiParam chat_id Messages's chat_id.
 * @apiSuccess {Object} messages Messages's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Messages not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ text, user, chat_id, createdAt }),
  create)

/**
 * @api {get} /messages Retrieve messages
 * @apiName RetrieveMessages
 * @apiGroup Messages
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of messages.
 * @apiSuccess {Object[]} rows List of messages.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /messages/:id Retrieve messages
 * @apiName RetrieveMessages
 * @apiGroup Messages
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} messages Messages's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Messages not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true }),
  show)


/**
 * @api {get} /messages/getmessagesbycourseid/:id Retrieve messages
 * @apiName RetrieveMessages
 * @apiGroup Messages
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} messages Messages's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Messages not found.
 * @apiError 401 admin access only.
 */
router.get('/getmessagesbycourseid/:id',
  token({ required: true }),
  getMessagesByCourseId)


/**
 * @api {put} /messages/:id Update messages
 * @apiName UpdateMessages
 * @apiGroup Messages
 * @apiParam {String} access_token admin access token.
 * @apiParam content Messages's content.
 * @apiParam sender_id Messages's sender_id.
 * @apiParam chat_id Messages's chat_id.
 * @apiSuccess {Object} messages Messages's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Messages not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ text, user, chat_id, createdAt }),
  update)

/**
 * @api {delete} /messages/:id Delete messages
 * @apiName DeleteMessages
 * @apiGroup Messages
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Messages not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
