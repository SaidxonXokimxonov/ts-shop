export type Product = {
    id: number;
    productName: string;
    price: number;
    quantity: number;
    img: string;
    info: string;
};
export type Data = {
    products: Product[];
    cart: Product[];
    subtotal: number;
}