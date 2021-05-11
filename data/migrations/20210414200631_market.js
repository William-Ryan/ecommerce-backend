exports.up = function(knex) {
    return knex.schema.createTable('market', market => {
      market.increments();
      
      market
      .string('name', 80)
      .notNullable()

      market
      .decimal('price')
      .notNullable()

      market
      .string('category')
      .notNullable()
    
      market
      .integer('quantity')
      .notNullable()

      market
      .integer('seller')
      .unsigned()
      .notNullable()
      .references('id')
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