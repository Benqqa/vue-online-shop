<template>
    <div class="popup__wrapper" ref='popup__wrapper'>
      <div class="v-popup">
          <div class="popup__header">
              <h2>{{popup.title}}</h2>
          </div>
          <div class="popup__body">
            <slot></slot>    
          </div>
        </div>
        </div>
    </template>
    
    <script>
    export default {
        name:'v-popup',
        props:{
          popup:{
            type: Object,
            default(){
              return {}
            }
          }
        },
        data(){
          return{}
        },
        methods:{
          closePopup(){
            this.$emit('closePopup')
          },
          submitPupup(){
            this.$emit('submitPupup')
            this.$emit('closePopup')
          }
        },
        mounted(){
          let vm = this;
          document.addEventListener('click', function(item){
            if(item.target === vm.$refs['popup__wrapper']){
              console.log(123);
              vm.closePopup()
            }
          })
        }
    }
    </script>
    
    <style lang="scss">
    .popup__wrapper{
      background: rgba(0, 0, 0, 0.411);
      position: fixed;
      z-index: 5;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .v-popup{
      background: #E1E1E1;
      position: fixed;
      top: 10%;
      min-width: 400px;
      width: 40%;
      padding-top: 0;
      display: flex;
      flex-direction: column;
    }
    .popup__header{
      background: #fcb939;
      display: flex;
      
      align-items: center;
      justify-content: center;
    }
    .popup__body{
      padding: 15px;
    }
    .popup__actions{
      display: flex;
      justify-content: flex-end;
      gap: 20px;
    }
    .popup__btn{
      cursor: pointer;
    }
    .popup__text{
      margin-bottom: 20px;
    }
    @media (max-width: 700px)and (max-aspect-ratio: 3/2) {
    .v-popup{
      background: #E1E1E1;
      position: fixed;
      //top: 10%;
      //min-width: 400px;
      //width: 40%;
      padding-top: 0;
      display: flex;
      flex-direction: column;
      max-height: 80vh;
      overflow: auto;
    }
    .popup__body{
        width: 100vw;
        padding: 0 ;
    }
    }
    </style>