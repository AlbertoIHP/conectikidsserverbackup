import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Comments, { schema } from './model'

const router = new Router()
const { content, activity_id, createdBy_id } = schema.tree

/**
 * @api {post} /comments Create comments
 * @apiName CreateComments
 * @apiGroup Comments
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam content Comments's content.
 * @apiParam activity_id Comments's activity_id.
 * @apiParam createdBy_id Comments's createdBy_id.
 * @apiSuccess {Object} comments Comments's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Comments not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ content, activity_id, createdBy_id }),
  create)

/**
 * @api {get} /comments Retrieve comments
 * @apiName RetrieveComments
 * @apiGroup Comments
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of comments.
 * @apiSuccess {Object[]} rows List of comments.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /comments/:id Retrieve comments
 * @apiName RetrieveComments
 * @apiGroup Comments
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} comments Comments's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Comments not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /comments/:id Update comments
 * @apiName UpdateComments
 * @apiGroup Comments
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam content Comments's content.
 * @apiParam activity_id Comments's activity_id.
 * @apiParam createdBy_id Comments's createdBy_id.
 * @apiSuccess {Object} comments Comments's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Comments not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ content, activity_id, createdBy_id }),
  update)

/**
 * @api {delete} /comments/:id Delete comments
 * @apiName DeleteComments
 * @apiGroup Comments
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Comments not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
