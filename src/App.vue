
<template>
  <vHeader></vHeader>
  <router-view/>
  <vFooter></vFooter>
</template>

<script>
import './assets/styles/null.css';
import './assets/styles/text/h.scss';
import vHeader from "/src/components/UI/v-header.vue";
import VCatalog from "/src/pages/v-catalog.vue"
import vFooter from './components/UI/v-footer.vue';

export default {
    name: 'app',
    components: {
    vHeader,
    VCatalog,
    vFooter
},
    data(){
        return {
            text: 'Welcome to vue Proj'
        }
    }
}
</script>

<style lang="scss">
    #app{
        font-family: 'Merriweather', serif;
    }
</style>