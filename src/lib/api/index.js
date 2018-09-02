import axios from "axios";

const lang = "en";
const baseUrl = `https://${lang}.wikipedia.org/w/api.php`;
const defaultParams = {
  format: "json",
  origin: "*"
};

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
  );

export const fetchMedia = title =>
  new Promise((resolve, reject) =>
    fetch({
      action: "query",
      iiprop: "timestamp|url|size|mime|mediatype|extmetadata",
      iiextmetadatafilter:
        "DateTime|ImageDescription|License|Credit|Artist|GPSLatitude|GPSLongitude|Attribution",
      iiextmetadatalanguage: "en",
      prop: "imageinfo",
      titles: title
    }).then(({ data: { error, query } }) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(query.pages[-1]);
      }
    })
  );

export const fetchRandom = () =>
  new Promise((resolve, reject) =>
    fetch({
      action: "query",
      list: "random",
      rnnamespace: 0,
      rnlimit: 1
    }).then(({ data: { error, query } }) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(query.random[0]);
      }
    })
  );

export const fetchPages = query =>
  new Promise((resolve, reject) =>
    fetch({
      prop: "pageprops|pageimages|pageterms",
      format: "json",
      generator: "prefixsearch",
      ppprop: "displaytitle",
      piprop: "thumbnail",
      pithumbsize: 160,
      pilimit: 10,
      wbptterms: "description",
      gpssearch: decodeURIComponent(query),
      gpsnamespace: 0,
      gpslimit: 10
    }).then(({ data: { error, query } }) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(query.pages);
      }
    })
  );

export const fetchPage = title =>
  new Promise((resolve, reject) =>
    fetch({
      action: "parse",
      disableeditsection: true,
      disablestylededuplication: true,
      mobileformat: true,
      page: decodeURIComponent(title),
      prop: "text|sections|images|displaytitle",
      redirects: true,
      wrapoutputclass: "root"
    }).then(({ data: { error, parse } }) => {
      if (error) {
        return reject(error);
      } else {
        const { displaytitle, images, sections, text } = parse;

        return resolve({
          title: displaytitle,
          images,
          sections,
          content: formatHtml(text["*"])
        });
      }
    })
  );

export const formatHtml = html =>
  html
    .replace(/style="[^"]*"/g, "")
    .replace(/href="\/wiki\//g, `href="/`)
    .replace(/width="[^"]*"/g, "")
    .replace(/height="[^"]*"/g, "");
