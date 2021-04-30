exports.up = function(knex) {
    return knex.schema.createTable('itemImage', itemImage => {
      itemImage.increments();
  
      itemImage
        .string('image')
        .notNullable()
      
      itemImage
        .integer('item')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('market')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    });
};
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('itemImage');
};