export class Product{
    title:string;
    price:number;
    category:string;
    imageURL:string;
    $key:string;

    static withoutKey(prod:Product){
        return {
            title: prod.title,
            price: prod.price,
            category: prod.category,
            imageURL: prod.imageURL
        }
    }
}