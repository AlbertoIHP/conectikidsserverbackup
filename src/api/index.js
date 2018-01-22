import { Router } from 'express'
import user from './user'
import auth from './auth'
import passwordReset from './password-reset'
import childrens from './childrens'
import activities from './activities'
import courses from './courses'
import gardens from './gardens'
import tasks from './tasks'
import chats from './chats'
import messages from './messages'
import chatsusers from './chatsusers'
import comments from './comments'
import likes from './likes'

const router = new Router()

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */
router.use('/users', user)
router.use('/auth', auth)
router.use('/password-resets', passwordReset)
router.use('/childrens', childrens)
router.use('/activities', activities)
router.use('/courses', courses)
router.use('/gardens', gardens)
router.use('/tasks', tasks)
router.use('/chats', chats)
router.use('/messages', messages)
router.use('/chatsusers', chatsusers)
router.use('/comments', comments)
router.use('/likes', likes)


router.get('/forgot/:forgottoken', function(request, response, next) {

	response.render( 'index' )

});

export default router
