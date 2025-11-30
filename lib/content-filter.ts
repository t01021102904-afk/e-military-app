// Forbidden words and phrases filter
const FORBIDDEN_PATTERNS = [
  // Political terms
  /\b(democrat|republican|liberal|conservative|trump|biden|election|vote|politics)\b/gi,
  // Religious proselytizing (allow general blessings)
  /\b(convert|salvation|accept jesus|born again|religious doctrine)\b/gi,
  // Military information requests
  /\b(location|coordinates|deployment|mission details|classified|secret)\b/gi,
  // Sexual content
  /\b(sex|sexual|nude|porn|xxx)\b/gi,
  // Money requests
  /\b(send money|wire transfer|paypal|venmo|cash|donation to me)\b/gi,
  // Offensive content
  /\b(fuck|shit|damn|hell|bastard|asshole)\b/gi,
]

const ALLOWED_RELIGIOUS_PHRASES = [
  "god bless you",
  "god bless",
  "pray for you",
  "prayers for you",
  "praying for you",
  "god be with you",
]

export function checkContentFilter(content: string): { allowed: boolean; reason?: string } {
  const lowerContent = content.toLowerCase()

  // Check if it's an allowed religious phrase
  const hasAllowedPhrase = ALLOWED_RELIGIOUS_PHRASES.some((phrase) => lowerContent.includes(phrase))

  // Check forbidden patterns
  for (const pattern of FORBIDDEN_PATTERNS) {
    const matches = content.match(pattern)
    if (matches && matches.length > 0) {
      // Skip if it's part of an allowed religious phrase
      const matchText = matches[0].toLowerCase()
      const isPartOfAllowed = ALLOWED_RELIGIOUS_PHRASES.some(
        (phrase) => phrase.includes(matchText) || lowerContent.includes(phrase),
      )

      if (!isPartOfAllowed) {
        return {
          allowed: false,
          reason: `Content contains prohibited material: ${matches[0]}. Please avoid political, military intelligence, sexual, or financial content.`,
        }
      }
    }
  }

  return { allowed: true }
}

export function validateLetterContent(content: string): { valid: boolean; error?: string } {
  const trimmed = content.trim()

  if (trimmed.length < 500) {
    return {
      valid: false,
      error: `Letter must be at least 500 characters. Current: ${trimmed.length} characters.`,
    }
  }

  if (trimmed.length > 5000) {
    return {
      valid: false,
      error: `Letter must not exceed 5000 characters. Current: ${trimmed.length} characters.`,
    }
  }

  const filterResult = checkContentFilter(content)
  if (!filterResult.allowed) {
    return {
      valid: false,
      error: filterResult.reason,
    }
  }

  return { valid: true }
}
