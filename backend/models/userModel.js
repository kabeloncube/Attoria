const createUserModel = (db) => {
  return {
    createUser: (username, email, hashedPassword) => {
      return new Promise((resolve, reject) => {
        db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
          [username, email, hashedPassword],
          function (err) {
            if (err) return reject(err);
            return resolve(this.lastID);
          }
        );
      });
    },

    findByUsername: (username) => {
      return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
          if (err) return reject(err);
          return resolve(row);
        });
      });
    }
  };
};

module.exports = createUserModel;
