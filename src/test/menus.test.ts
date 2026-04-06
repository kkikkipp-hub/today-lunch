import { describe, it, expect } from 'vitest'
import { recommendMenus, MENUS } from '../data/menus'

describe('recommendMenus', () => {
  it('returns at most 3 items', () => {
    const result = recommendMenus(['hearty'], [], 20000)
    expect(result.length).toBeLessThanOrEqual(3)
  })

  it('filters by budget — excludes menus with minPrice above budget', () => {
    const result = recommendMenus([], [], 5000)
    result.forEach(m => expect(m.minPrice).toBeLessThanOrEqual(5000))
  })

  it('filters by category', () => {
    const result = recommendMenus([], ['korean'], 20000)
    result.forEach(m => expect(m.category).toBe('korean'))
  })

  it('ranks mood-matching menus first', () => {
    const result = recommendMenus(['healthy'], [], 20000)
    expect(result[0].moods).toContain('healthy')
  })

  it('returns empty array when budget is too low for all menus', () => {
    const result = recommendMenus([], [], 1000)
    expect(result).toHaveLength(0)
  })

  it('returns all categories when categories array is empty', () => {
    const result = recommendMenus([], [], 20000)
    expect(result.length).toBeGreaterThan(0)
    expect(result[0]).toBeDefined()
  })

  it('all MENUS have valid price ranges (minPrice <= maxPrice)', () => {
    MENUS.forEach(m => {
      expect(m.minPrice).toBeLessThanOrEqual(m.maxPrice)
    })
  })
})
