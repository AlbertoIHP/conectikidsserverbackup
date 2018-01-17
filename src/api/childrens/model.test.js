import { Childrens } from '.'

let childrens

beforeEach(async () => {
  childrens = await Childrens.create({ rut: 'test', name: 'test', parent_id: 'test', course_id: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = childrens.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(childrens.id)
    expect(view.rut).toBe(childrens.rut)
    expect(view.name).toBe(childrens.name)
    expect(view.parent_id).toBe(childrens.parent_id)
    expect(view.course_id).toBe(childrens.course_id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = childrens.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(childrens.id)
    expect(view.rut).toBe(childrens.rut)
    expect(view.name).toBe(childrens.name)
    expect(view.parent_id).toBe(childrens.parent_id)
    expect(view.course_id).toBe(childrens.course_id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
