import { Chatsusers } from '.'

let chatsusers

beforeEach(async () => {
  chatsusers = await Chatsusers.create({ chat_id: 'test', user_id: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = chatsusers.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(chatsusers.id)
    expect(view.chat_id).toBe(chatsusers.chat_id)
    expect(view.user_id).toBe(chatsusers.user_id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = chatsusers.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(chatsusers.id)
    expect(view.chat_id).toBe(chatsusers.chat_id)
    expect(view.user_id).toBe(chatsusers.user_id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
