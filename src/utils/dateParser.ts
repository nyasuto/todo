/**
 * YYYY-MM-DD形式の日付文字列をローカルタイムゾーンでDateオブジェクトに変換
 * new Date('YYYY-MM-DD')はUTCとして扱われるため、タイムゾーンによって日付がずれる問題を回避
 *
 * @param dateStr YYYY-MM-DD形式の日付文字列
 * @returns ローカルタイムゾーンのDateオブジェクト
 *
 * @example
 * // UTCタイムゾーンでない環境で、2025-10-01を選択した場合
 * const wrongDate = new Date('2025-10-01') // 2025-09-30 17:00:00 (UTC-7の場合)
 * const correctDate = parseDateInLocalTimezone('2025-10-01') // 2025-10-01 00:00:00
 */
export const parseDateInLocalTimezone = (dateStr: string): Date => {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day)
}