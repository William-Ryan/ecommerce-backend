exports.up = function(knex) {
    return knex.schema.createTable('market', market => {
      market.increments();
      
      market
      .string('name', 80)
      .notNullable()

      market
      .string('category')
      .notNullable()
    
      market
      .integer('quantity')
      .notNullable()

      market
      .string('seller')
      .unsigned()
      .notNullable()
      .references('name')
      .inTable('user')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

      market
      .string('status')
      .notNullable()

      market
      .string('description', 255)
      .notNullable()
    });
};
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('market');
};