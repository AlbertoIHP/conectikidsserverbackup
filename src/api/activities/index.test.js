import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Activities } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, activities

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  activities = await Activities.create({})
})

test('POST /activities 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, createdAt: 'test', description: 'test', createdBy_id: 'test', course_id: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.createdAt).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.createdBy_id).toEqual('test')
  expect(body.course_id).toEqual('test')
})

test('POST /activities 401 (admin)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession })
  expect(status).toBe(401)
})

test('POST /activities 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /activities 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /activities 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /activities 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /activities 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /activities/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${activities.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(activities.id)
})

test('GET /activities/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${activities.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /activities/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${activities.id}`)
  expect(status).toBe(401)
})

test('GET /activities/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /activities/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${activities.id}`)
    .send({ access_token: adminSession, createdAt: 'test', description: 'test', createdBy_id: 'test', course_id: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(activities.id)
  expect(body.createdAt).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.createdBy_id).toEqual('test')
  expect(body.course_id).toEqual('test')
})

test('PUT /activities/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${activities.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /activities/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${activities.id}`)
  expect(status).toBe(401)
})

test('PUT /activities/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, createdAt: 'test', description: 'test', createdBy_id: 'test', course_id: 'test' })
  expect(status).toBe(404)
})

test('DELETE /activities/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${activities.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /activities/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${activities.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /activities/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${activities.id}`)
  expect(status).toBe(401)
})

test('DELETE /activities/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
