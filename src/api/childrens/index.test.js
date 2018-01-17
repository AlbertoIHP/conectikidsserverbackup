import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Childrens } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, childrens

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  childrens = await Childrens.create({})
})

test('POST /childrens 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, rut: 'test', name: 'test', parent_id: 'test', course_id: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.rut).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.parent_id).toEqual('test')
  expect(body.course_id).toEqual('test')
})

test('POST /childrens 401 (admin)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession })
  expect(status).toBe(401)
})

test('POST /childrens 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /childrens 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /childrens 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /childrens 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /childrens 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /childrens/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${childrens.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(childrens.id)
})

test('GET /childrens/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${childrens.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /childrens/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${childrens.id}`)
  expect(status).toBe(401)
})

test('GET /childrens/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /childrens/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${childrens.id}`)
    .send({ access_token: adminSession, rut: 'test', name: 'test', parent_id: 'test', course_id: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(childrens.id)
  expect(body.rut).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.parent_id).toEqual('test')
  expect(body.course_id).toEqual('test')
})

test('PUT /childrens/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${childrens.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /childrens/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${childrens.id}`)
  expect(status).toBe(401)
})

test('PUT /childrens/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, rut: 'test', name: 'test', parent_id: 'test', course_id: 'test' })
  expect(status).toBe(404)
})

test('DELETE /childrens/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${childrens.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /childrens/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${childrens.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /childrens/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${childrens.id}`)
  expect(status).toBe(401)
})

test('DELETE /childrens/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
