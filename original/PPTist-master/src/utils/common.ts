import { padStart } from 'lodash'

/**
 * Pad digit length
 * @param digit The number
 * @param len The number of digits
 */
export const fillDigit = (digit: number, len: number) => {
  return padStart('' + digit, len, '0')
}

/**
 * Detect device
 */
export const isPC = () => {
  return !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|Mobile|BlackBerry|Symbian|Windows Phone)/i)
}

/**
 * Validate URL string
 */
export const isValidURL = (url: string) => {
  return /^(https?:\/\/)([\w-]+\.)+[\w-]{2,}(\/[\w-./?%&=]*)?$/i.test(url)
}

/**
 * Convert HTML to plain text
 */
export const htmlToText = (html: string) => {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent || ''
}