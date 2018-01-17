import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Chatsusers } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, chatsusers

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  chatsusers = await Chatsusers.create({})
})

test('POST /chatsusers 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, chat_id: 'test', user_id: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.chat_id).toEqual('test')
  expect(body.user_id).toEqual('test')
})

test('POST /chatsusers 401 (admin)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession })
  expect(status).toBe(401)
})

test('POST /chatsusers 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /chatsusers 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /chatsusers 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /chatsusers 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /chatsusers 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /chatsusers/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${chatsusers.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(chatsusers.id)
})

test('GET /chatsusers/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${chatsusers.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /chatsusers/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${chatsusers.id}`)
  expect(status).toBe(401)
})

test('GET /chatsusers/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /chatsusers/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${chatsusers.id}`)
    .send({ access_token: adminSession, chat_id: 'test', user_id: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(chatsusers.id)
  expect(body.chat_id).toEqual('test')
  expect(body.user_id).toEqual('test')
})

test('PUT /chatsusers/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${chatsusers.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /chatsusers/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${chatsusers.id}`)
  expect(status).toBe(401)
})

test('PUT /chatsusers/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, chat_id: 'test', user_id: 'test' })
  expect(status).toBe(404)
})

test('DELETE /chatsusers/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${chatsusers.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /chatsusers/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${chatsusers.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /chatsusers/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${chatsusers.id}`)
  expect(status).toBe(401)
})

test('DELETE /chatsusers/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
