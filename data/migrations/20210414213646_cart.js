exports.up = function(knex) {
    return knex.schema.createTable('cart', cart => {
      cart.increments();

      cart.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')

      cart.integer('market_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('resources')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')
    
      cart.integer('quantity')
        .notNullable()
  })
};
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cart');
};