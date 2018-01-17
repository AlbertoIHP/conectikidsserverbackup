import { Gardens } from '.'

let gardens

beforeEach(async () => {
  gardens = await Gardens.create({ name: 'test', direction: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = gardens.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(gardens.id)
    expect(view.name).toBe(gardens.name)
    expect(view.direction).toBe(gardens.direction)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = gardens.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(gardens.id)
    expect(view.name).toBe(gardens.name)
    expect(view.direction).toBe(gardens.direction)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
