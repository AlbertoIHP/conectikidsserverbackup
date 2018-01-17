import { Courses } from '.'

let courses

beforeEach(async () => {
  courses = await Courses.create({ name: 'test', garden_id: 'test', teacher_id: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = courses.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(courses.id)
    expect(view.name).toBe(courses.name)
    expect(view.garden_id).toBe(courses.garden_id)
    expect(view.teacher_id).toBe(courses.teacher_id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = courses.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(courses.id)
    expect(view.name).toBe(courses.name)
    expect(view.garden_id).toBe(courses.garden_id)
    expect(view.teacher_id).toBe(courses.teacher_id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
