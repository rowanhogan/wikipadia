export const stripTags = string =>
  string.replace(/<\/?[^>]+(>|$)/g, '')
