import { describe, it, expect, beforeEach } from 'vitest'
import { getHistory, addRecord, getBudgetGoal, setBudgetGoal, getTodayRecord } from '../utils/history'
import type { MenuItem } from '../data/menus'

const mockMenu: MenuItem = {
  id: 'm01',
  name: '김치찌개 정식',
  category: 'korean',
  moods: ['hearty', 'spicy'],
  minPrice: 8000,
  maxPrice: 10000,
  tags: ['얼큰', '든든', '한식'],
  reason: '테스트용',
}

beforeEach(() => {
  localStorage.clear()
})

describe('getHistory', () => {
  it('returns empty array when no history', () => {
    expect(getHistory()).toEqual([])
  })

  it('returns parsed history from localStorage', () => {
    addRecord(mockMenu)
    const history = getHistory()
    expect(history).toHaveLength(1)
    expect(history[0].menuName).toBe('김치찌개 정식')
  })
})

describe('addRecord', () => {
  it('uses midpoint price when no price given', () => {
    const record = addRecord(mockMenu)
    expect(record.price).toBe(9000) // (8000 + 10000) / 2
  })

  it('uses provided price when given', () => {
    const record = addRecord(mockMenu, 8500)
    expect(record.price).toBe(8500)
  })

  it('replaces existing record for same day', () => {
    addRecord(mockMenu)
    const anotherMenu = { ...mockMenu, id: 'm02', name: '된장찌개 정식' }
    addRecord(anotherMenu)
    expect(getHistory()).toHaveLength(1)
    expect(getHistory()[0].menuName).toBe('된장찌개 정식')
  })

  it('stores menuId on the record', () => {
    const record = addRecord(mockMenu)
    expect(record.menuId).toBe('m01')
  })
})

describe('getBudgetGoal / setBudgetGoal', () => {
  it('returns default 50000 when not set', () => {
    expect(getBudgetGoal()).toBe(50000)
  })

  it('returns stored value after setBudgetGoal', () => {
    setBudgetGoal(40000)
    expect(getBudgetGoal()).toBe(40000)
  })
})

describe('getTodayRecord', () => {
  it('returns null when no record today', () => {
    expect(getTodayRecord()).toBeNull()
  })

  it('returns today record after adding one', () => {
    addRecord(mockMenu)
    const record = getTodayRecord()
    expect(record).not.toBeNull()
    expect(record?.menuId).toBe('m01')
  })
})
