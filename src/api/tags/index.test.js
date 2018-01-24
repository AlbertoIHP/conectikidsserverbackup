import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Tags } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, tags

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  tags = await Tags.create({})
})

test('POST /tags 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, activity_id: 'test', tagged_id: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.activity_id).toEqual('test')
  expect(body.tagged_id).toEqual('test')
})

test('POST /tags 401 (admin)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession })
  expect(status).toBe(401)
})

test('POST /tags 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /tags 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /tags 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /tags 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /tags 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /tags/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${tags.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(tags.id)
})

test('GET /tags/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${tags.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /tags/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${tags.id}`)
  expect(status).toBe(401)
})

test('GET /tags/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /tags/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${tags.id}`)
    .send({ access_token: adminSession, activity_id: 'test', tagged_id: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(tags.id)
  expect(body.activity_id).toEqual('test')
  expect(body.tagged_id).toEqual('test')
})

test('PUT /tags/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${tags.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /tags/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${tags.id}`)
  expect(status).toBe(401)
})

test('PUT /tags/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, activity_id: 'test', tagged_id: 'test' })
  expect(status).toBe(404)
})

test('DELETE /tags/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${tags.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /tags/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${tags.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /tags/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${tags.id}`)
  expect(status).toBe(401)
})

test('DELETE /tags/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
