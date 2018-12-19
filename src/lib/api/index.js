import axios from 'axios'
import lodashGet from 'lodash/get'
import sortBy from 'lodash/sortBy'
import values from 'lodash/values'

const lang = 'en'
const baseUrl = `https://${lang}.wikipedia.org/w/api.php`
const defaultParams = {
  format: 'json',
  origin: '*'
}

export const fetch = params =>
  axios.get(
    baseUrl,
    {
      params: {
        ...defaultParams,
        ...params
      }
    },
    {
      withCredentials: true
    }
  )

export const fetchMedia = title =>
  new Promise((resolve, reject) =>
    fetch({
      action: 'query',
      iiprop: 'timestamp|url|size|mime|mediatype|extmetadata',
      iiextmetadatafilter:
        'DateTime|ImageDescription|License|Credit|Artist|GPSLatitude|GPSLongitude|Attribution',
      iiextmetadatalanguage: 'en',
      prop: 'imageinfo',
      titles: title
    }).then(({ data: { error, query } }) => {
      if (error) {
        return reject(error)
      } else {
        const data = lodashGet(query, 'pages[-1]')

        return resolve({
          title: data.title,
          content: lodashGet(data, 'imageinfo[0]')
        })
      }
    })
  )

export const fetchRandom = () =>
  new Promise((resolve, reject) =>
    fetch({
      action: 'query',
      list: 'random',
      rnnamespace: 0,
      rnlimit: 1
    }).then(({ data: { error, query } }) => {
      if (error) {
        return reject(error)
      } else {
        return resolve(query.random[0])
      }
    })
  )

export const fetchPages = query =>
  new Promise((resolve, reject) =>
    fetch({
      action: 'query',
      generator: 'prefixsearch',
      gpslimit: 8,
      gpsnamespace: 0,
      gpssearch: query,
      pilimit: 8,
      ppprop: 'displaytitle',
      prop: 'pageprops|pageterms',
      wbptterms: 'description'
    }).then(({ data: { error, query } }) => {
      if (error || !query) {
        return reject(error)
      } else {
        const { pages = [] } = query
        const results = sortBy(values(pages), 'index')
        const deserializeResult = result => ({
          description: lodashGet(result, 'terms.description[0]'),
          link: '/' + encodeURIComponent(result.title.replace(' ', '_')),
          title: result.title
        })

        return resolve(results.map(deserializeResult))
      }
    })
  )

export const fetchPage = title =>
  new Promise((resolve, reject) =>
    fetch({
      action: 'parse',
      disableeditsection: true,
      disablestylededuplication: true,
      mobileformat: true,
      page: decodeURIComponent(title),
      prop: 'text|sections|images|displaytitle',
      redirects: true,
      wrapoutputclass: 'root'
    }).then(({ data: { error, parse } }) => {
      if (error) {
        return reject(error)
      } else {
        const { displaytitle, images, sections, text } = parse

        return resolve({
          title: displaytitle,
          images,
          sections,
          content: formatHtml(text['*'], title === 'Main_page')
        })
      }
    })
  )

export const formatHtml = (html, stripStyles) => {
  const formatted = html
    .replace(/href="\/wiki\//g, `href="/`)
    .replace(/width="[^"]*"/g, '')
    .replace(/height="[^"]*"/g, '')

  return stripStyles ? formatted.replace(/style="[^"]*"/g, '') : formatted
}
