export const temp = 5; //Tanlangan elementning idsi

  
//elementni indexsini bilib olamiz
export const index = state.products.findIndex((product) => product.id === temp);


// elementni malumotlari masalan:name,img
export const malumotlar = state.products[index];



//maxsulotni html
export function updateProductDetails() {
    // ID bo'yicha elementlarni topish
    document.getElementById('product-name')!.textContent = malumotlar.productName;
    document.getElementById('product-img')!.src = malumotlar.img;
    document.getElementById('product-price')!.textContent = `Price: £${malumotlar.price}`;
    document.getElementById('product-description')!.textContent = malumotlar.info;
}