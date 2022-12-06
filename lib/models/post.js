const pool = require('../utils/pool.js');

module.exports = class Post {
  id;
  user_id;
  post;

  constructor(row) {
    this.id = row.id;
    this.user_id = row.user_id;
    this.post = row.post;
  }

  static async insert({ post, user_id }) {
    const { rows } = await pool.query(
      `
        INSERT INTO posts (post, user_id)
        VALUES ($1, $2)
        RETURNING *
        `,
      [post, user_id]
    );
    return new Post(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from posts');
    return rows.map((row) => new Post(row));
  }
};
