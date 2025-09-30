import { describe, it, expect } from 'vitest'
import { parseDateInLocalTimezone } from './dateParser'

describe('parseDateInLocalTimezone', () => {
  it('should parse YYYY-MM-DD string to Date in local timezone', () => {
    const dateStr = '2025-10-01'
    const result = parseDateInLocalTimezone(dateStr)

    expect(result).toBeInstanceOf(Date)
    expect(result.getFullYear()).toBe(2025)
    expect(result.getMonth()).toBe(9) // 0-indexed
    expect(result.getDate()).toBe(1)
  })

  it('should handle different dates correctly', () => {
    const testCases = [
      { input: '2025-01-15', expected: { year: 2025, month: 0, day: 15 } },
      { input: '2024-12-31', expected: { year: 2024, month: 11, day: 31 } },
      { input: '2025-06-01', expected: { year: 2025, month: 5, day: 1 } },
    ]

    testCases.forEach(({ input, expected }) => {
      const result = parseDateInLocalTimezone(input)
      expect(result.getFullYear()).toBe(expected.year)
      expect(result.getMonth()).toBe(expected.month)
      expect(result.getDate()).toBe(expected.day)
    })
  })

  it('should create date with time set to midnight local timezone', () => {
    const result = parseDateInLocalTimezone('2025-10-01')

    expect(result.getHours()).toBe(0)
    expect(result.getMinutes()).toBe(0)
    expect(result.getSeconds()).toBe(0)
    expect(result.getMilliseconds()).toBe(0)
  })

  it('should not be affected by UTC timezone offset', () => {
    const localDate = parseDateInLocalTimezone('2025-10-01')

    // ローカルタイムゾーンで正しく解釈されていることを確認
    expect(localDate.getDate()).toBe(1)
    expect(localDate.getMonth()).toBe(9)

    // YYYY-MM-DD形式で正しい日付が得られることを確認
    const localDateOnly = localDate.toLocaleDateString('en-CA') // YYYY-MM-DD形式
    expect(localDateOnly).toBe('2025-10-01')
  })
})