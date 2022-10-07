<template>
  <div class="v-catalog">
    <div class="wrapper">
      <h1>Картины эпохи Возрождения</h1>
      <div class="catalog">
        <vCatalogItem
          v-for="item in catalogList"
          :data="item"
          :key="item.id"
          @add-to-cart='addToCart'
          @remove-from-cart='removeFromCart'
        ></vCatalogItem>
      </div>
    </div>
  </div>
  
</template>

<script>
import vHeader from "/src/components/UI/v-header.vue";
import vButton from "/src/components/UI/v-button.vue";
import vSearch from "/src/components/UI/v-search.vue";
import vCatalogItem from "../components/UI/v-catalog-item.vue";
import { CartService } from '/src/helpers/CartService';

export default {
  name: 'v-catalog',
  props:{
  },
  components:{
    vHeader,
    vButton,
    vSearch,
    vCatalogItem,
},

  data(){
    return {
      text: 'Hellow',
      cartProducts: CartService.getAllCartProducts(),
      catalog: [],
      //можно конечно положить дату в json...н
      data:[
        {
          img: '/src/assets/img/1.png',
          title: '«Рождение Венеры»',
          author: 'Сандро Боттичелли',
          price: 1000000,
          discountPrice: 2000000,
          isSold: false,
          description: 'Идейные соображения высшего порядка, а также консультация с широким активом влечет за собой процесс внедрения и модернизации направлений прогрессивного развития. Таким образом реализация намеченных плановых заданий играет важную роль в формировании существенных финансовых и административных условий. Значимость этих проблем настолько очевидна, что начало повседневной работы по формированию позиции в значительной степени обуславливает создание позиций, занимаемых участниками в отношении поставленных задач. С другой стороны консультация с широким активом представляет собой интересный эксперимент проверки модели развития.',
          id: 1,
        },
        {
          img: '/src/assets/img/2.png',
          title: '«Тайная вечеря»',
          author: 'Леонардо да Винчи',
          price: 3000000,
          discountPrice: null,
          isSold: false,
          description: 'С другой стороны сложившаяся структура организации в значительной степени обуславливает создание существенных финансовых и административных условий. Разнообразный и богатый опыт постоянное информационно-пропагандистское обеспечение нашей деятельности влечет за собой процесс внедрения и модернизации соответствующий условий активизации. Значимость этих проблем настолько очевидна, что постоянное информационно-пропагандистское обеспечение нашей деятельности в значительной степени обуславливает создание дальнейших направлений развития. Разнообразный и богатый опыт постоянное информационно-пропагандистское обеспечение нашей деятельности влечет за собой процесс внедрения и модернизации модели развития.',
          id: 2,
        },
        {
          img: '/src/assets/img/3.png',
          title: '«Сотворение Адама»',
          author: 'Микеланджело',
          price: 5000000,
          discountPrice: 6000000,
          isSold: false,
          description: 'Повседневная практика показывает, что укрепление и развитие структуры в значительной степени обуславливает создание системы обучения кадров, соответствует насущным потребностям. С другой стороны начало повседневной работы по формированию позиции способствует подготовки и реализации новых предложений. Идейные соображения высшего порядка, а также начало повседневной работы по формированию позиции влечет за собой процесс внедрения и модернизации позиций, занимаемых участниками в отношении поставленных задач. Товарищи! укрепление и развитие структуры представляет собой интересный эксперимент проверки существенных финансовых и административных условий.',
          id: 3,
        },
        {
          img: '/src/assets/img/4.png',
          title: '«Урок анатомии»',
          author: 'Рембрандт',
          price: 1000000,
          discountPrice: 2000000,
          isSold: true,
          description: 'Разнообразный и богатый опыт начало повседневной работы по формированию позиции требуют определения и уточнения позиций, занимаемых участниками в отношении поставленных задач. Повседневная практика показывает, что постоянный количественный рост и сфера нашей активности представляет собой интересный эксперимент проверки системы обучения кадров, соответствует насущным потребностям.',
          id: 4,
        }
      ]
    }
  },
  mounted(){
    console.log('cat', this.catalog)
    console.log('cat', this.cartProducts)
    this.catalog = this.calcData(this.data)
  },
  computed:{
    catalogList() {
      let text = this.$route.query.search;
      if(text === '' || typeof text === 'object'|| text === undefined){
        return this.catalog
      }
      let arr = this.catalog;
      let newArray = [];
      const search = text.toLowerCase();
      for (let el of arr) {
        if ((el.title+' '+el.author).toLowerCase().indexOf(search) != -1) newArray.push(el);
      }      
      return newArray;
    }
  },
  methods:{
    calcData(data){
      console.log('cart',this.cartProducts.length);
      let newData = [];
      for(let product of data){
        product.inCart = false;
        if(CartService.getItemById(product.id)){
          product.inCart = true
        }
        newData.push(product)
      }
      return newData
    },
     addToCart(product){
      CartService.updateItem(product.id, product)
      this.catalog = this.calcData(this.data)
    },
    removeFromCart(product){
      CartService.removeItem(product.id)
      this.catalog = this.calcData(this.data)
    },
  },
}
</script>

<style lang="scss">
body{
  display: flex;
  flex-direction: column;
}
.v-catalog{
  min-height: 70.5vh;
  flex: 1;
}
.catalog{
  display: flex;
  gap: 32px;
  margin-top: 40px;
  flex-wrap: wrap;
}
.wrapper{
  padding: 0 17% 0 18.50%;
}
@media (max-aspect-ratio: 3/2) {
  .wrapper{
    padding: 0vw ;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .catalog{
    flex-direction: column;
    align-items: center;
  }
}
@media (max-width: 700px)and (max-aspect-ratio: 3/2) {
  .wrapper{
    padding: 0vw ;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .catalog{
    flex-direction: column;
    align-items: center;
  }
}
</style>