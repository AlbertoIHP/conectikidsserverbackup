import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Courses } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, courses

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  courses = await Courses.create({})
})

test('POST /courses 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, name: 'test', garden_id: 'test', teacher_id: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.garden_id).toEqual('test')
  expect(body.teacher_id).toEqual('test')
})

test('POST /courses 401 (admin)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession })
  expect(status).toBe(401)
})

test('POST /courses 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /courses 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /courses 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /courses 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /courses 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /courses/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${courses.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(courses.id)
})

test('GET /courses/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${courses.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /courses/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${courses.id}`)
  expect(status).toBe(401)
})

test('GET /courses/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /courses/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${courses.id}`)
    .send({ access_token: adminSession, name: 'test', garden_id: 'test', teacher_id: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(courses.id)
  expect(body.name).toEqual('test')
  expect(body.garden_id).toEqual('test')
  expect(body.teacher_id).toEqual('test')
})

test('PUT /courses/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${courses.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /courses/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${courses.id}`)
  expect(status).toBe(401)
})

test('PUT /courses/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, name: 'test', garden_id: 'test', teacher_id: 'test' })
  expect(status).toBe(404)
})

test('DELETE /courses/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${courses.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /courses/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${courses.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /courses/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${courses.id}`)
  expect(status).toBe(401)
})

test('DELETE /courses/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
