import axios from "axios";

export const fetchMedia = (title, lang = "en") =>
  new Promise((resolve, reject) =>
    axios
      .get(`https://${lang}.wikipedia.org/w/api.php`, {
        params: {
          action: "query",
          format: "json",
          iiprop: "timestamp|url|size|mime|mediatype|extmetadata",
          origin: "*",
          prop: "imageinfo",
          titles: title
        }
      })
      .then(({ data: { error, query } }) => {
        if (error) {
          return reject(error);
        } else {
          return resolve(query.pages[-1]);
        }
      })
  );

export const fetchPage = (title, lang = "en") =>
  new Promise((resolve, reject) =>
    axios
      .get(`https://${lang}.wikipedia.org/w/api.php`, {
        params: {
          action: "parse",
          disableeditsection: true,
          disablestylededuplication: true,
          format: "json",
          // mainpage: title === "Main_page",
          mobileformat: true,
          origin: "*",
          page: title,
          prop: "text|sections|images|displaytitle",
          redirects: true,
          wrapoutputclass: "root"
        }
      })
      .then(({ data: { error, parse } }) => {
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
  html.replace(/style="[^"]*"/g, "").replace(/href="\/wiki\//g, 'href="/');
