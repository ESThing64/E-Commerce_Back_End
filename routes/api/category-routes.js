const router = require('express').Router();
const { Category, Product } = require('../../models');


router.get('/', async (req, res) => {
  try {
    const CategoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.get('/:id', async (req, res) => {
 
  try {
    const CategoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    
    if (!CategoryData) {
      res.status(404).json({ message: "There is no category found with this id. 😢" });
      return;
    }

    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const CategoryData = await Category.create(req.body)
    res.status(200).json(CategoryData)
  } catch (err) {
    res.status(200).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const CategoryData = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id

        },
      })
      if (!CategoryData){
        res.status(404).json({ message: "my team of gerbils couldn't find a category with that id."})
        return;
      }
      res.status(200).json(CategoryData);
    } catch (err) {
      res.status(500).json(err);
    
  }
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const CategoryData = await Category.destroy({
      where: { id: req.params.id }
    });

    if (!CategoryData) {
      res.status(404).json({ message: "Umm you cannot delete something that doesn't exist. " });
      return;
    }
    res.status(200).json({message: `You have succesufly deleted the category with the id of ${req.params.id}`});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
