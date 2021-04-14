exports.up = function(knex) {
    return knex.schema.createTable('user', user => {
      user.increments();
      
      user
      .string('username', 100)
      .notNullable()

      user
      .string('name', 50)
      .notNullable()
    
      user
      .string('password', 100)
      .notNullable()

      user
      .string('description', 255)
    });
};
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user');
};