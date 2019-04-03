Vue.directive('enter-number', {
  inserted: function (el) {
    el.addEventListener("keypress",function(e){
      e = e || window.event
      let charcode = typeof e.charCode == 'number' ? e.charCode : e.keyCode
      let re = /\d/
      if(!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey){
          if(e.preventDefault){
              e.preventDefault()
          }else{
              e.returnValue = false
          }
      }
    })
  }
})

Vue.directive('enter-number-2', {
  inserted: function (el) {
    el.addEventListener("keypress",function(e){
      e = e || window.event
      let charcode = typeof e.charCode == 'number' ? e.charCode : e.keyCode
      let re = /\d/;
      if(charcode == 46){
        if(el.value.includes('.')){
          e.preventDefault()
        }
        return
      }else if(!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey){
        if(e.preventDefault){
          e.preventDefault()
        }else{
            e.returnValue = false
        }
      }
    });
  }
})
