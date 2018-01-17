import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Tasks } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, tasks

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  tasks = await Tasks.create({})
})

test('POST /tasks 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, name: 'test', description: 'test', selectedDate: 'test', timeof: 'test', course_id: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.selectedDate).toEqual('test')
  expect(body.timeof).toEqual('test')
  expect(body.course_id).toEqual('test')
})

test('POST /tasks 401 (admin)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession })
  expect(status).toBe(401)
})

test('POST /tasks 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /tasks 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /tasks 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /tasks 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /tasks 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /tasks/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${tasks.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(tasks.id)
})

test('GET /tasks/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${tasks.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /tasks/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${tasks.id}`)
  expect(status).toBe(401)
})

test('GET /tasks/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /tasks/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${tasks.id}`)
    .send({ access_token: adminSession, name: 'test', description: 'test', selectedDate: 'test', timeof: 'test', course_id: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(tasks.id)
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.selectedDate).toEqual('test')
  expect(body.timeof).toEqual('test')
  expect(body.course_id).toEqual('test')
})

test('PUT /tasks/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${tasks.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /tasks/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${tasks.id}`)
  expect(status).toBe(401)
})

test('PUT /tasks/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, name: 'test', description: 'test', selectedDate: 'test', timeof: 'test', course_id: 'test' })
  expect(status).toBe(404)
})

test('DELETE /tasks/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${tasks.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /tasks/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${tasks.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /tasks/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${tasks.id}`)
  expect(status).toBe(401)
})

test('DELETE /tasks/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
