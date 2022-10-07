<template>
  <div class="v-btn" :class="{inCart: isCartElem}">

    <img 
        class="v-btn__load"
        v-if="isLoading"
        src="/src/assets/img/load.svg" alt=""
    >

    <svg
        v-if="isCartElem && !isLoading" 
        width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.5316 4.80934L7.63353 14.2369L3.34826 10.1923" stroke="#F4F6F9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <h4 v-if="!isLoading">{{isCartElem? 'В корзине': text}}</h4>
  </div>
</template>

<script>
export default {
    name: 'v-button',
    props:{
        text: {
            type: String,
            default(){
                return 'Btn'
            }
        },
        isCartElem: {
            type: Boolean,
            default(){
                return false
            }
        },
        isLoading: {
            type: Boolean,
            default(){
                return false
            }
        }
    },
    data(){
        return{}
    },
}
</script>

<style lang="scss">
.v-btn{
    cursor: pointer;
    min-width: 118px;
    width: 118px;
    min-height: 48px;
    height: 48px;
    background: #403432;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    color: #F4F6F9;
    &:hover{
        background: #776763;
    }
    &:disabled{
        background: #C1B4B1;
    }
}
.v-btn__load{
    width: 30px;
    height: 30px;
}
.inCart{
    background: #5B3A32;
}
</style>