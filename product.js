
const db=require('../util/database');

module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id=id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
   return db.execute('insert into products(title,price,description,imageURL) values(?,?,?,?)',
            [this.title,this.price,this.description,this.imageUrl]);
  }

  static deletebyId(id){
   
  }
  static fetchAll() {
    return db.execute('select * from products');
  }
  static findbyId(id){
return db.execute('select * from products where id=?',[id]);
  }
};
