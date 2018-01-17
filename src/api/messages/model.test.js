import { Messages } from '.'

let messages

beforeEach(async () => {
  messages = await Messages.create({ content: 'test', sender_id: 'test', chat_id: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = messages.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(messages.id)
    expect(view.content).toBe(messages.content)
    expect(view.sender_id).toBe(messages.sender_id)
    expect(view.chat_id).toBe(messages.chat_id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = messages.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(messages.id)
    expect(view.content).toBe(messages.content)
    expect(view.sender_id).toBe(messages.sender_id)
    expect(view.chat_id).toBe(messages.chat_id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
