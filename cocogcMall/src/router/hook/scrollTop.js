export default (router) => {
  router.afterEach((to,from) => {
    if (to.meta.scrolltop) {
      window.scrollTo(0,0);
    }
  });
}
