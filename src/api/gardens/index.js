import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Gardens, { schema } from './model'

const router = new Router()
const { name, direction } = schema.tree

/**
 * @api {post} /gardens Create gardens
 * @apiName CreateGardens
 * @apiGroup Gardens
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Gardens's name.
 * @apiParam direction Gardens's direction.
 * @apiSuccess {Object} gardens Gardens's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Gardens not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ name, direction }),
  create)

/**
 * @api {get} /gardens Retrieve gardens
 * @apiName RetrieveGardens
 * @apiGroup Gardens
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of gardens.
 * @apiSuccess {Object[]} rows List of gardens.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /gardens/:id Retrieve gardens
 * @apiName RetrieveGardens
 * @apiGroup Gardens
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} gardens Gardens's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Gardens not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /gardens/:id Update gardens
 * @apiName UpdateGardens
 * @apiGroup Gardens
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Gardens's name.
 * @apiParam direction Gardens's direction.
 * @apiSuccess {Object} gardens Gardens's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Gardens not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, direction }),
  update)

/**
 * @api {delete} /gardens/:id Delete gardens
 * @apiName DeleteGardens
 * @apiGroup Gardens
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Gardens not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
