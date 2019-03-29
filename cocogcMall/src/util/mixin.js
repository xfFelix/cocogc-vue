export default {
  methods: {
    confirmBack() {
      this.MessageBox({
        message: '<div>请登录后继续操作</div><div>立即登录？</div>',
        title: '您好',
        showCancelButton: true
      }).then(res => {
        if (/cancel/.test(res)) {
          return
        } else if (/confirm/.test(res)) {
          this.$router.push({
            path: '/login',
            query: {
              redirect: this.$route.path
            }
          });
        }
      })
    }
  }
}
