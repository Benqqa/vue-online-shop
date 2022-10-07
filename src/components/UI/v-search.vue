<template>
  <div class="v-search" :class="{'active': magic_flag}">
    <input 
        @focus="magic_flag = true"
        @blur="magic_flag = false"
        type="text"
        v-model="searchValue"
        placeholder="Поиск по названию картины"
    >
    <vButton 
        text="Найти"
        @click="search(searchValue)"
    ></vButton>
  </div>
</template>

<script>
import vButton from "/src/components/UI/v-button.vue"

export default {
    name: 'v-search',
    components:{
        vButton
    },
    data(){
        return{
            magic_flag: false,
            searchValue:'',
        }
    },
    watch:{
        searchValue: function(newV, oldV){
            if(newV == ''){
                this.search('')
            }
        }
    },
    methods:{
        search(value){
            this.$router.push({name: 'catalog', query: { 'search': value}});
        },
    }
}
</script>

<style lang="scss" scoped>
.v-search{
    display: flex;
    width: 416px;
    height: 48px;
    border: solid 1px #E1E1E1;
    &>input{
        width: 100%;
        height: 100%;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 150%;
        color: #343030;
        padding: 13px 16px 14px 16px;
    }
}
.active{
    border-color: #B5B5B5;
}
@media (max-width: 700px)and (max-aspect-ratio: 3/2) {
    .v-search{
        width: 98vw;
        flex-direction: column;
        &>input{
            width: 100vw;
            height: 100vw;
        }
    }
}
</style>