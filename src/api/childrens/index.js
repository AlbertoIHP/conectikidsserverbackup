import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Childrens, { schema } from './model'

const router = new Router()
const { rut, name, parent_id, course_id } = schema.tree

/**
 * @api {post} /childrens Create childrens
 * @apiName CreateChildrens
 * @apiGroup Childrens
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam rut Childrens's rut.
 * @apiParam name Childrens's name.
 * @apiParam parent_id Childrens's parent_id.
 * @apiParam course_id Childrens's course_id.
 * @apiSuccess {Object} childrens Childrens's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Childrens not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ rut, name, parent_id, course_id }),
  create)

/**
 * @api {get} /childrens Retrieve childrens
 * @apiName RetrieveChildrens
 * @apiGroup Childrens
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of childrens.
 * @apiSuccess {Object[]} rows List of childrens.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /childrens/:id Retrieve childrens
 * @apiName RetrieveChildrens
 * @apiGroup Childrens
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} childrens Childrens's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Childrens not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /childrens/:id Update childrens
 * @apiName UpdateChildrens
 * @apiGroup Childrens
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam rut Childrens's rut.
 * @apiParam name Childrens's name.
 * @apiParam parent_id Childrens's parent_id.
 * @apiParam course_id Childrens's course_id.
 * @apiSuccess {Object} childrens Childrens's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Childrens not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ rut, name, parent_id, course_id }),
  update)

/**
 * @api {delete} /childrens/:id Delete childrens
 * @apiName DeleteChildrens
 * @apiGroup Childrens
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Childrens not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
