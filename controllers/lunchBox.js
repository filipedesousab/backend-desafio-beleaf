const lunchBoxDal = require('../models/dal/lunchBox');

exports.get = (req, res) => {
  const { id } = req.params;

  if (id) {
    // Busca marmita pelo id
    lunchBoxDal.select({ id }, (lunchBox) => {
        // Se houver marmita, retorna a marmita
        if(lunchBox) {
          res.json(lunchBox);
        } else {
          res.status(401).json({ error: { message: 'Failed to get lunch box!' } });
        }
      }
    );
  } else {
    // Busca todas as marmitas
    lunchBoxDal.selectAll((lunchBoxes) => {
      // Se houver marmitas, retorna as marmitas
      if(lunchBoxes.length > 0) {
        res.json(lunchBoxes);
      } else {
        res.status(401).json({ error: { message: 'Failed to get lunch boxes!' } });
      }
    }
  );
  }
}

exports.insertAndUpdate = (router) => {
  router.post('/', (req, res) => {
    const {
      name,
      price,
      discount,
      quantity,
      image,
      description,
      ingredients,
    } = req.body;

    // Insere uma marmita
    lunchBoxDal.insert(
      {
        name,
        price,
        discount,
        quantity,
        image,
        description,
        ingredients,
      },
      (lunchBox) => {
        // Se o cadastro for efetuado com sucesso retornará a marmita
        if(lunchBox) {
          res.json(lunchBox);
        } else {
          res.status(401).json({ error: { message: 'Failed to register lunch box!' } });
        }
      }
    );
  });

  router.put('/', (req, res) => {
    const {
      id,
      name,
      price,
      discount,
      quantity,
      image,
      description,
      ingredients,
    } = req.body;

    // Insere uma marmita
    lunchBoxDal.update(
      {
        id,
        name,
        price,
        discount,
        quantity,
        image,
        description,
        ingredients,
      },
      (lunchBox) => {
        // Se o cadastro for efetuado com sucesso retornará a marmita
        if(lunchBox) {
          res.json(lunchBox);
        } else {
          res.status(401).json({ error: { message: 'Failed to register lunch box!' } });
        }
      }
    );
  });

  router.put('/delete', (req, res) => {
    const { id } = req.body;

    console.log(id)
    // Remove uma marmita
    lunchBoxDal.delete(
      { id},
      (ok) => {
        // Se o cadastro for efetuado com sucesso retornará a marmita
        if(ok) {
          res.json(ok);
        } else {
          res.status(401).json({ error: { message: 'Failed to remove lunch box!' } });
        }
      }
    );
  });

  return router;
}
