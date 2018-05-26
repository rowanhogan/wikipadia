export default {
  getSiteData: () => ({
    title: "Wikipadia - A beautiful Wikipedia reader"
  }),
  getRoutes: async () => [
    {
      path: "/",
      component: "src/routes/Home"
    },
    {
      is404: true,
      component: "src/routes/404"
    }
  ]
};
