const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const TagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  };
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try {
    const TagData = await Tag.findByPk(req.params.id, {
      include: [{
         model: Product,
        }],
    });
    
    if (!TagData) {
      res.status(404).json({ message: "There are no tags found with that id. 😢" });
      return;
    }
    
    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try {
    const TagData = await Tag.create(req.body)
    res.status(200).json(TagData)
  } catch (err) {
    res.status(200).json(err);
  }
});



router.put('/:id', async (req, res) => {
  try {
    const TagData = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id

        },
      })
      if (!TagData){
        res.status(404).json({ message: "my team of gerbils couldn't find a category with that id."})
        return;
      }
      res.status(200).json(TagData);
    } catch (err) {
      res.status(500).json(err);
    
  }
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const TagData = await Tag.destroy({
      where: { id: req.params.id }
    });

    if (!TagData) {
      res.status(404).json({ message: "Umm you cannot delete something that doesn't exist. " });
      return;
    }
    res.status(200).json({message: `You have succesufly deleted the tag with the id of ${req.params.id}`});
  } catch (err) {
    res.status(500).json(err);
  }
  // delete on tag by its `id` value
});

module.exports = router;
