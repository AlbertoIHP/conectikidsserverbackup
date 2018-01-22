import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Likes, { schema } from './model'

const router = new Router()
const { user_id, activity_id } = schema.tree

/**
 * @api {post} /likes Create likes
 * @apiName CreateLikes
 * @apiGroup Likes
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam user_id Likes's user_id.
 * @apiParam activity_id Likes's activity_id.
 * @apiSuccess {Object} likes Likes's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Likes not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ user_id, activity_id }),
  create)

/**
 * @api {get} /likes Retrieve likes
 * @apiName RetrieveLikes
 * @apiGroup Likes
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of likes.
 * @apiSuccess {Object[]} rows List of likes.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /likes/:id Retrieve likes
 * @apiName RetrieveLikes
 * @apiGroup Likes
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} likes Likes's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Likes not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /likes/:id Update likes
 * @apiName UpdateLikes
 * @apiGroup Likes
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam user_id Likes's user_id.
 * @apiParam activity_id Likes's activity_id.
 * @apiSuccess {Object} likes Likes's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Likes not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ user_id, activity_id }),
  update)

/**
 * @api {delete} /likes/:id Delete likes
 * @apiName DeleteLikes
 * @apiGroup Likes
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Likes not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
