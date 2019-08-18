const bcrypt = require('bcrypt');

const database = require('../../modules/database');

// Selecionar uma marmita
exports.select = ({ id }, callback = () => {}) => {
  // Iniciar conexão com banco de dados
  const connection = database.connect();

  try {
    connection.query(
      `SELECT * FROM lunchbox WHERE lunchbox_id='${id}'`,
      (error, results) => {
        if (error) throw error;

        // Se houver marmita
        if (results.length > 0) {
          callback({
            id: results[0].lunchbox_id,
            name: results[0].name,
            price: results[0].price,
            discount: results[0].discount,
            quantity: results[0].quantity,
            image: results[0].image,
            description: results[0].description,
            ingredients: results[0].ingredients,
          });
        } else {
          callback(false);
        }
      },
    );
  } finally {
    // Finalizar conexão com banco de dados
    connection.end();
  }
};

// Selecionar todas as marmitas
exports.selectAll = (all, callback = () => {}) => {
  // Iniciar conexão com banco de dados
  const connection = database.connect();

  try {
    connection.query(
      `SELECT * FROM lunchbox ${all ? '' : 'WHERE quantity > 0'}`,
      (error, results) => {
        if (error) throw error;

        // Se houver marmitas
        if (results.length > 0) {
          const lunchBoxes = results.map(item => ({
            id: item.lunchbox_id,
            name: item.name,
            price: item.price,
            discount: item.discount,
            quantity: item.quantity,
            image: item.image,
            description: item.description,
            ingredients: item.ingredients,
          }))

          callback(lunchBoxes);
        } else {
          callback(false);
        }
      },
    );
  } finally {
    // Finalizar conexão com banco de dados
    connection.end();
  }
};

// Registrar uma marmita
exports.insert = (data, callback = () => {}) => {
  // Iniciar conexão com banco de dados
  const connection = database.connect();

  const {
    name,
    price,
    discount,
    quantity,
    image,
    description,
    ingredients,
  } =  data;

  try {
    connection.query(
      `INSERT INTO lunchbox (name, price, discount, quantity, image, description, ingredients)
       VALUES ('${name}', '${price}', '${discount}', '${quantity}', '${image}', '${description}', '${ingredients}')`,
      (error, results) => {
        if (error) throw error;

        callback({
          id: results.insertId,
          name,
          price,
          discount,
          quantity,
          image,
          description,
          ingredients,
        });
      },
    );
  } finally {
    // Finalizar conexão com banco de dados
    connection.end();
  }
};

// Atualizar uma marmita
exports.update = (data, callback = () => {}) => {
  // Iniciar conexão com banco de dados
  const connection = database.connect();

  const {
    id,
    name,
    price,
    discount,
    quantity,
    image,
    description,
    ingredients,
  } = data;

  let values = '';
  if (name) values += `name='${name}'`;
  if (price) values += `price='${price}', `;
  if (discount) values += `discount='${discount}'`;
  if (quantity) values += `quantity='${quantity}'`;
  if (image) values += `image='${image === 'null' ? '' : image}'`;
  if (description) values += `description='${description}'`;
  if (ingredients) values += `ingredients='${ingredients}'`;

  try {
    connection.query(
      `UPDATE lunchbox
       SET ${values}
       WHERE lunchbox_id=${id}`,
      (error, results) => {
        if (error) throw error;

        callback({
          id,
          name,
          price,
          discount,
          quantity,
          image,
          description,
          ingredients,
        });
      },
    );
  } finally {
    // Finalizar conexão com banco de dados
    connection.end();
  }
};

// Remover uma marmita
exports.delete = ({ id }, callback = () => {}) => {
  // Iniciar conexão com banco de dados
  const connection = database.connect();

  try {
    connection.query(
      `DELETE FROM lunchbox WHERE lunchbox_id=${id}`,
      (error, results) => {
        if (error) throw error;

        callback(true);
      },
    );
  } finally {
    // Finalizar conexão com banco de dados
    connection.end();
  }
};
