<template>
  <div class="v-catalog-item">
    <v-popup v-if="popupData.isOpen"
        :popup="popupData"
        @closePopup='popupData.isOpen = false'
        @submitPupup='popupData.action(popupData.args)'
    >
    <div>
    <swiper
        :slidesPerView="'auto'"
        :spaceBetween="30"
        :pagination="{
        clickable: true,
        }"
        :modules="modules"
        class="mySwiper"
    >
        <swiper-slide>
            <img :src="data.img" alt="">
        </swiper-slide>
        <swiper-slide>
            <img :src="data.img" alt="">
        </swiper-slide>
        <swiper-slide>
            <img :src="data.img" alt="">
        </swiper-slide>
        <swiper-slide>
            <img :src="data.img" alt="">
        </swiper-slide>
        <swiper-slide>
            <img :src="data.img" alt="">
        </swiper-slide>
        <swiper-slide>
            <img :src="data.img" alt="">
        </swiper-slide>
    </swiper>
  </div>
    <div class="item__content">
        <div class="item__title">
            <h2>{{data.title}} {{data.author}}</h2>
        </div>
        <div class="item__body">
            <h5>{{data.description}}</h5>
        </div>
        <div class="item__bottom" :style="{'justifyContent': 'flex-end', 'gap': '20px'}">
            <div class="item__price">
                <h6 class="item__discount">{{formattedPrice(toFix(data.discountPrice))}}</h6>
                <h3 class="item__price">{{formattedPrice(toFix(data.price))}}</h3>
            </div>
            <vButton
                :text="btnText"
                :isCartElem="data.inCart"
                @click="timer(data)"
                :isLoading="isLoading"
            ></vButton>
        </div>
    </div>

    </v-popup>
    <div class="item__img"  @click="openPopup()">
        <img :src="data.img" alt="">
    </div>
    <div class="item__content">
        <div class="item__title" @click="openPopup()">
            <h2>{{data.title}}</h2>
            <h2>{{data.author}}</h2>
        </div>
        <div class="item__bottom" v-if="!data.isSold">
            <div class="item__price">
                <h6 
                    class="item__discount"
                    v-if="data.discountPrice != null"
                >
                    {{formattedPrice(toFix(data.discountPrice))}}
                </h6>
                <h3 class="item__price">{{formattedPrice(toFix(data.price))}}</h3>
            </div>
            <vButton
                :text="btnText"
                :isCartElem="data.inCart"
                @click="timer(data)"
                :isLoading="isLoading"
                ></vButton>
        </div>
        <div class="item__bottom" v-else>
            <h2>Продана на аукционе</h2>
            <div class="shadow"></div>
        </div>      
    </div>
  </div>
</template>

<script>
import vButton from "/src/components/UI/v-button.vue";
import vPopup from '/src/components/Modal/v-popup.vue';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "/src/assets/styles/swiper.scss";
// import required modules
import { Pagination } from "swiper";

export default {
    name: 'v-catalog-item',
    components:{
        vButton,
        vPopup,
        Swiper,
        SwiperSlide,
    },
    setup() {
        return {
        modules: [Pagination],
        };
    },
    props:{
        data:{
            type: Object,
            default(){
                return {}
            }
        }
    },
    data(){
        return {
            btnText:'Купить',
            isLoading: false,
            popupData: {isOpen: false},
        }
    },
    methods:{
        toFix(value){
            value = parseFloat(value)
            return value.toFixed(0)+' $'
        },
        formattedPrice(value){
            let parts = value.toString().split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,' ');
            return parts.join('.')
        },
        timer(product) {
            this.isLoading = true;
            let vm = this;
            setTimeout(function(){
                vm.addToCart(product);
                }, 2000);   
        },
        addToCart(product){
            this.isLoading = false;
            if(!product.inCart){
                this.$emit('add-to-cart', product)
            } else{
                this.$emit('remove-from-cart', product)
                this.btnText = 'Купить';
            }
        },
        openPopup(title, text, action, args){
            this.popupData={
                title,
                text,
                action,
                args,
                isOpen: true
            }
        },
    }
}

</script>

<style lang="scss" >
.item__content{
    padding: 20px 22px 24px 22px;
}
.item__discount{
    text-decoration: line-through;
    color: #A0A0A0;
}
.item__price{
    color: #343030;

}
.item__title{
    margin: 0 12px 20px 0;
}
.item__img{
    cursor: pointer;
    width: 100%;
    height: 156px;
    //margin-bottom: -10px;
    &>img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
.item__body{
    margin-bottom: 40px;
}
.item__bottom{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 48px;
}
.v-catalog-item{
    position: relative;
    width: 280px;
    max-height: 328px;
    border: solid 1px #E1E1E1;
}
.shadow{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.411);
}
</style>