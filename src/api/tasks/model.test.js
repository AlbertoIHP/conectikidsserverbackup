import { Tasks } from '.'

let tasks

beforeEach(async () => {
  tasks = await Tasks.create({ name: 'test', description: 'test', selectedDate: 'test', timeof: 'test', course_id: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = tasks.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(tasks.id)
    expect(view.name).toBe(tasks.name)
    expect(view.description).toBe(tasks.description)
    expect(view.selectedDate).toBe(tasks.selectedDate)
    expect(view.timeof).toBe(tasks.timeof)
    expect(view.course_id).toBe(tasks.course_id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = tasks.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(tasks.id)
    expect(view.name).toBe(tasks.name)
    expect(view.description).toBe(tasks.description)
    expect(view.selectedDate).toBe(tasks.selectedDate)
    expect(view.timeof).toBe(tasks.timeof)
    expect(view.course_id).toBe(tasks.course_id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
