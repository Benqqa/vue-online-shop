import { LocalStorageService } from './LocalStorageService'
export const STORAGE_KEY = 'cart'

export const CartService = {
  //Хранит содержимое корзины
  storeAll(items) {
    LocalStorageService.setItem(STORAGE_KEY, items)
  },
  getAllCartProducts() {
    return LocalStorageService.getItem(STORAGE_KEY, [])
  },
  getItemById(productId) {
    const items = LocalStorageService.getItem(STORAGE_KEY, [])
    const index = items.findIndex(i => i.id === productId)
    if (index === -1) return false
    return items[index]
  },
  updateItem(productId, payload) {
    let index=0;
    let items=[]
    console.log(CartService.getAllCartProducts().length == undefined)
    if(CartService.getAllCartProducts().length == undefined){
      index = -1;
    } else{
      items = CartService.getAllCartProducts()
      console.log()
      index = items.findIndex(i => i.id === productId)
    }
    if (index === -1) {
      items.push(payload)
    } else {
      items.splice(index, 1, payload)
    }
    CartService.storeAll(items)
  },
  removeItem(productId) {
    const items = CartService.getAllCartProducts()
    const index = items.findIndex(i => i.id === productId)
    items.splice(index, 1)
    CartService.storeAll(items)
  }
}