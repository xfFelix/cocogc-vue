export default (router) => {
  router.beforeEach((to, from, next) => {
    if (_hmt) {
      console.log(_hmt)
      if (to.path) {
        _hmt.push(['_trackPageview'], '/#' + to.fullPath)
      }
    }
    next()
  });
}
