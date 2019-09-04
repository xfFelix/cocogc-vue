const loginMix={
  data(){
    return{
      clean:{
        passCleanShow:false,
        telCleanShow:false,
        imgValidCleanShow:false,
        smsCleanShow:false,
        passConfirmShow:false
      },
      formMsg: {
        userName: '',
        smsValid: '',
        imgValid: '',
        passWord: '',
        passConfirm:''
      },
      eyeImgState:false,
      passInpShow:false,
      eyeImgConState:false,
      passInpConShow:false,
      telList: [
        {
          telRealVal: 86,
          telShowVal: '+86 中国',
        },
        {
          telRealVal: 852,
          telShowVal: '+852 香港',
        }
      ],
      telPlace: 86
    }
  },
  methods:{
    telInp: function(ev) {
      this.clean.telCleanShow = true;
    },
    passInp: function(ev) {
        this.clean.passCleanShow = true;
    },
    imgValidInp: function(ev) {
        this.clean.imgValidCleanShow = true;
    },
    smsValidInp: function(ev) {
        this.clean.smsCleanShow = true;
    },
    passConfirmInp: function(ev) {
      this.clean.passConfirmShow = true;
    },
    telClean: function() {
        this.formMsg.userName = ''
    },
    passClean: function() {
        this.formMsg.passWord = ''
    },
    imgValidClean: function() {
        this.formMsg.imgValid= ''
    },
    smsClean: function() {
        this.formMsg.smsValid = ''
    },
    passConfirmClean: function(ev) {
      this.formMsg.passConfirm = '';
    },
    eyeImgClose: function() {
      this.eyeImgState = false;
      this.passInpShow = false;
    },
    eyeImgOpen: function() {
      this.eyeImgState = true;
      this.passInpShow = true;
    },
    eyeImgConClose: function() {
      this.eyeImgConState = false;
      this.passInpConShow = false;
    },
    eyeImgConOpen: function() {
      this.eyeImgConState = true;
      this.passInpConShow = true;
    },
    indexSelect(event) {
      this.telPlace = event.target.value;
    },
  }
}

export default loginMix
