import { state } from './constants';
import { addCartbtn, backButton, block, btnclose, describtionBox, imglBox, modal, modalbtn, modelBox, nameBox, priceBox, table, total } from './elements';
import type { Product } from './type';

function renderHtml() {
  const cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');

  let res = state.products
    .map((item, index) => {
      return `
        <div class="flex flex-col border border-gray-200 rounded-[16px]" onclick='openInfo(${item.id})'>
          <a class="border-b border-gray-200" href="./info.html">
            <img class="w-full transition-all duration-500 ease-in-out transform hover:scale-110" src="${item.img}" alt="">
          </a>
          <div class="p-3 pb-3 flex justify-between items-center bg-[#2A2A72] rounded-b-[16px]">
            <div>
                <p class="text-[20px] font-2xl text-white">${item.productName}</p>
                <p class="text-[30px] font-xl text-white">$ ${item.price}</p>
            </div>
            ${cart?.some(prod => prod.id === item?.id) ? ` <i onclick='removeModal(${item.id})' class="bi bi-dash-square text-4xl text-white cursor-pointer"></i>` : ` <i onclick='addModal(${index})' class="bi bi-plus-square text-4xl text-white cursor-pointer"></i>`}
          </div>
        </div>
        `;
    })
    .join('');

  block.innerHTML = res;
  console.log(cart.includes(state.cart[0]));
  
}

function renderModal() {
  const cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');

  let res = cart
    .map((item, index) => {
      return `
            <tr class='text-center'>
                <td >${index + 1}</td>
                <td ><img class='w-20 h-20 m-auto' src='${item.img}'/></td>
                <td >${item.productName}</td>
                <td >$${item.price}</td>
                <td > <div> <button class="bi bi-dash" onclick='removeQuantity(${item.id})'></button> <span>${item.quantity}</span> <button onclick='addQuantity(${item.id})' class="bi bi-plus"></button></div> </td>
                <td >$${item.quantity * item.price}</td>
                <td ><button  onclick='removeModal(${item.id})'> <i class='bi text-red-800 bi-trash text-2xl'></i></button></td>
            </tr>
        `;
    })
    .join('');

  table.innerHTML = res;
}

function updateProductDetails() {
  const index = state.products.findIndex(product => product.id === Number(localStorage.getItem('Index')));
  const data = state.products[index];
  nameBox.innerText = data.productName;
  modelBox.innerText = data.productName;
  priceBox.innerText = `Price: $${data.price}`;
  describtionBox.innerText = data.info;
  imglBox.innerHTML = `<img class='w-full h-full' src='${data.img}'/>`;
}

function addQuantity(id: number) {
  const cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');
  state.cart = cart
  let idx = state.cart.findIndex(item => item.id === id);
  state.cart[idx].quantity++;
  localStorage.setItem('cart', JSON.stringify(state.cart));

  renderModal();
  calcTotal();
}
function removeQuantity(id: number) {
  const cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');
  state.cart = cart
  let idx = state.cart.findIndex(item => item.id === id);
  if (state.cart[idx].quantity > 1) {
    state.cart[idx].quantity--;
  }
  localStorage.setItem('cart', JSON.stringify(state.cart));

  renderModal();
  calcTotal();
}

function openInfo(idx: number) {
  localStorage.setItem('Index', idx.toString());
}

function addModal(idx: number) {
//   state.cart.splice(0, state.cart.length);
const cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');
state.cart.concat(cart);
  state.cart.push(state.products[idx])
  localStorage.setItem('cart', JSON.stringify(state.cart));
  renderHtml()
}

function calcTotal() {
  const cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');
  let subtotal = 0;
  cart.map(item => {
    subtotal += item.price * item.quantity;
  });

  let tax = (subtotal / 100) * 20;

  total.innerHTML = `
        <div class=" w-auto p-5 border items-end flex flex-col">
            <span class='text-2xl'>SUBTOTAL: ${subtotal}</span>
            <span class='text-2xl'>TAX: ${tax}</span>
            <span class='text-2xl'>TOTAL: ${subtotal + tax}</span>
        </div>
    `;
}

function removeModal(id: number) {
  const cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');
  let idx = cart.findIndex(item => item.id === id);
  cart.splice(idx, 1);
  state.cart.splice(idx, 1);

  if (cart.length === 0) {
    window.location.href = '/public';
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  renderHtml();
  renderModal();
  calcTotal();
}

modalbtn?.addEventListener('click', () => {
  const cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');
  if (cart.length < 1) return;
  modal.classList.remove('hidden');
  renderModal();
  calcTotal();
});

btnclose?.addEventListener('click', () => {
  modal.classList.add('hidden');
});

backButton?.addEventListener('click', () => {
  window.location.href = '/public';
  renderHtml();
});

window.addEventListener('load', () => {
  if (block) {
    renderHtml();
  } else {
    updateProductDetails();
  }
});

(window as any).openInfo = openInfo;
(window as any).addModal = addModal;
(window as any).removeModal = removeModal;
(window as any).addQuantity = addQuantity;
(window as any).removeQuantity = removeQuantity;
