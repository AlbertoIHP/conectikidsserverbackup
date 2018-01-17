import { Activities } from '.'

let activities

beforeEach(async () => {
  activities = await Activities.create({ createdAt: 'test', description: 'test', createdBy_id: 'test', course_id: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = activities.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(activities.id)
    expect(view.createdAt).toBe(activities.createdAt)
    expect(view.description).toBe(activities.description)
    expect(view.createdBy_id).toBe(activities.createdBy_id)
    expect(view.course_id).toBe(activities.course_id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = activities.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(activities.id)
    expect(view.createdAt).toBe(activities.createdAt)
    expect(view.description).toBe(activities.description)
    expect(view.createdBy_id).toBe(activities.createdBy_id)
    expect(view.course_id).toBe(activities.course_id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
