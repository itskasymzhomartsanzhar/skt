export function normalizeRuKzPhoneDigits(value) {
  const onlyDigits = (value || '').replace(/\D/g, '')

  if (!onlyDigits) {
    return ''
  }

  if (onlyDigits[0] === '8') {
    return `7${onlyDigits.slice(1, 11)}`
  }

  if (onlyDigits[0] === '7') {
    return onlyDigits.slice(0, 11)
  }

  return `7${onlyDigits.slice(0, 10)}`
}

export function formatRuKzPhone(value) {
  const digits = normalizeRuKzPhoneDigits(value)

  if (!digits) {
    return ''
  }

  const country = digits[0]
  const code = digits.slice(1, 4)
  const partOne = digits.slice(4, 7)
  const partTwo = digits.slice(7, 9)
  const partThree = digits.slice(9, 11)

  let result = `+${country}`

  if (code) {
    result += ` (${code}`
    if (code.length === 3) {
      result += ')'
    }
  }

  if (partOne) {
    result += ` ${partOne}`
  }

  if (partTwo) {
    result += `-${partTwo}`
  }

  if (partThree) {
    result += `-${partThree}`
  }

  return result
}
