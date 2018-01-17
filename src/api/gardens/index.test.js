import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Gardens } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, gardens

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  gardens = await Gardens.create({})
})

test('POST /gardens 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, name: 'test', direction: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.direction).toEqual('test')
})

test('POST /gardens 401 (admin)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession })
  expect(status).toBe(401)
})

test('POST /gardens 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /gardens 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /gardens 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /gardens 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /gardens 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /gardens/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${gardens.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(gardens.id)
})

test('GET /gardens/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${gardens.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /gardens/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${gardens.id}`)
  expect(status).toBe(401)
})

test('GET /gardens/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /gardens/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${gardens.id}`)
    .send({ access_token: adminSession, name: 'test', direction: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(gardens.id)
  expect(body.name).toEqual('test')
  expect(body.direction).toEqual('test')
})

test('PUT /gardens/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${gardens.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /gardens/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${gardens.id}`)
  expect(status).toBe(401)
})

test('PUT /gardens/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, name: 'test', direction: 'test' })
  expect(status).toBe(404)
})

test('DELETE /gardens/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${gardens.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /gardens/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${gardens.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /gardens/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${gardens.id}`)
  expect(status).toBe(401)
})

test('DELETE /gardens/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
