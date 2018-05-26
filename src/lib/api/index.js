import axios from "axios";
// import wtf from "wtf_wikipedia";

export const fetchPage = (title, lang = "en") => {
  return axios
    .get(`https://${lang}.wikipedia.org/w/api.php`, {
      params: {
        action: "parse",
        format: "json",
        origin: "*",
        page: title,
        prop: "text|sections|images",
        redirects: true
      }
    })
    .then(res => res.data.parse);

  // return wtf.fetch(title, lang);
};
