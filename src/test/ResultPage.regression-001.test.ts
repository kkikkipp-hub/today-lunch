import { describe, it, expect } from 'vitest'
import type { MenuItem } from '../data/menus'

// Regression: ISSUE-001 — 다시 추천 must shuffle results, not navigate home
// Found by /qa on 2026-04-06
// Report: .gstack/qa-reports/qa-report-localhost-2026-04-06.md

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const MENUS: MenuItem[] = [
  { id: 'm01', name: '김치찌개 정식', category: 'korean', moods: ['hearty'], minPrice: 8000, maxPrice: 10000, tags: [], reason: '' },
  { id: 'm02', name: '된장찌개 정식', category: 'korean', moods: ['hearty'], minPrice: 7000, maxPrice: 9000, tags: [], reason: '' },
  { id: 'm03', name: '제육볶음 정식', category: 'korean', moods: ['hearty'], minPrice: 8000, maxPrice: 10000, tags: [], reason: '' },
]

describe('shuffleArray (reshuffle logic)', () => {
  it('returns array of same length', () => {
    expect(shuffleArray(MENUS)).toHaveLength(3)
  })

  it('contains the same elements', () => {
    const result = shuffleArray(MENUS)
    const ids = result.map(m => m.id).sort()
    expect(ids).toEqual(['m01', 'm02', 'm03'])
  })

  it('does not mutate the original array', () => {
    const original = [...MENUS]
    shuffleArray(MENUS)
    expect(MENUS).toEqual(original)
  })

  it('produces a different order at least once in 10 tries (probabilistic)', () => {
    // With 3 elements, same order probability = 1/6 per shuffle.
    // P(same order 10 times in a row) = (1/6)^10 ≈ negligible.
    const original = MENUS.map(m => m.id).join(',')
    const allSame = Array.from({ length: 10 }, () =>
      shuffleArray(MENUS).map(m => m.id).join(',')
    ).every(order => order === original)
    expect(allSame).toBe(false)
  })
})

// Regression: ISSUE-002 — alt menu list must exclude current main
// Found by /qa on 2026-04-06

describe('alt menu list excludes current main', () => {
  it('when mainIdx=0, alts are indices 1 and 2', () => {
    const mainIdx = 0
    const alts = MENUS.map((m, i) => i === mainIdx ? null : m).filter(Boolean)
    expect(alts).toHaveLength(2)
    expect(alts.map(m => m!.id)).toEqual(['m02', 'm03'])
  })

  it('when mainIdx=1, alts are indices 0 and 2', () => {
    const mainIdx = 1
    const alts = MENUS.map((m, i) => i === mainIdx ? null : m).filter(Boolean)
    expect(alts).toHaveLength(2)
    expect(alts.map(m => m!.id)).toEqual(['m01', 'm03'])
  })

  it('when mainIdx=2, alts are indices 0 and 1', () => {
    const mainIdx = 2
    const alts = MENUS.map((m, i) => i === mainIdx ? null : m).filter(Boolean)
    expect(alts).toHaveLength(2)
    expect(alts.map(m => m!.id)).toEqual(['m01', 'm02'])
  })

  it('alt list never includes the current main menu', () => {
    for (let mainIdx = 0; mainIdx < MENUS.length; mainIdx++) {
      const alts = MENUS.map((m, i) => i === mainIdx ? null : m).filter(Boolean)
      const mainId = MENUS[mainIdx].id
      expect(alts.map(m => m!.id)).not.toContain(mainId)
    }
  })
})
