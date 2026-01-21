import express from 'express';
import Product from '../models/product.js';

const router = express.Router();

//get para mostrar todos los productos por orden de creacion
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//publicar producto
router.post('/', async(req,res)=>{
    try{    

        const { name, description, price, category, stock, imageUrl } = req.body;

        // validación básica
        if (!name || !description || !price || !category || stock == null) {
        return res.status(400).json({ message: 'All fields are required' });
        }

        //le damos valor a una variable con el producto nuevo creado en el body
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category:req.body.category,
            stock: req.body.stock,
            imageUrl: req.body.imageUrl || 'http://placehold.co/400'
        })

        console.log(product);
        //y guardamos ese valor de la variable con save()
        const newProduct = await product.save();
        res.status(201).json(newProduct)

    }catch(err){
        res.status(500).json({message:err.message})
    }

})
//eliminamos por id en el parametro
router.delete('/:id', async (req, res) => {
  try {
    //guardamos ese producto encontrado por el id en la constante
    const product = await Product.findByIdAndDelete(req.params.id);
    //verificamos si tiene producto o no
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    //si tiene se elimina
    res.status(200).json({ message: 'Product deleted successfully' });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
