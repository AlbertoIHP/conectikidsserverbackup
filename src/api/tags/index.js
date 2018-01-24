import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Tags, { schema } from './model'

const router = new Router()
const { activity_id, tagged_id } = schema.tree

/**
 * @api {post} /tags Create tags
 * @apiName CreateTags
 * @apiGroup Tags
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam activity_id Tags's activity_id.
 * @apiParam tagged_id Tags's tagged_id.
 * @apiSuccess {Object} tags Tags's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tags not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ activity_id, tagged_id }),
  create)

/**
 * @api {get} /tags Retrieve tags
 * @apiName RetrieveTags
 * @apiGroup Tags
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of tags.
 * @apiSuccess {Object[]} rows List of tags.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /tags/:id Retrieve tags
 * @apiName RetrieveTags
 * @apiGroup Tags
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} tags Tags's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tags not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /tags/:id Update tags
 * @apiName UpdateTags
 * @apiGroup Tags
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam activity_id Tags's activity_id.
 * @apiParam tagged_id Tags's tagged_id.
 * @apiSuccess {Object} tags Tags's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tags not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ activity_id, tagged_id }),
  update)

/**
 * @api {delete} /tags/:id Delete tags
 * @apiName DeleteTags
 * @apiGroup Tags
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Tags not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
