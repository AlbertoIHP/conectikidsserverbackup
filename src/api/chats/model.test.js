import { Chats } from '.'

let chats

beforeEach(async () => {
  chats = await Chats.create({ course_id: 'test', name: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = chats.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(chats.id)
    expect(view.course_id).toBe(chats.course_id)
    expect(view.name).toBe(chats.name)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = chats.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(chats.id)
    expect(view.course_id).toBe(chats.course_id)
    expect(view.name).toBe(chats.name)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
