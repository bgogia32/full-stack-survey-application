/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('question_option', (table) => {
      table.increments('question_option_id').primary(); // Auto-incrementing ID
  
      // Foreign key to question
      table
        .integer('question_id')
        .unsigned()
        .notNullable()
        .references('question_id')
        .inTable('question')
        .onDelete('CASCADE');
  
      // Foreign key to answer_type
      table
        .integer('answer_type_id')
        .unsigned()
        .notNullable()
        .references('answer_type_id')
        .inTable('answer_type')
        .onDelete('CASCADE');
  
      table.string('option').notNullable();       // The option value
      table.timestamps(true, true);               // created_at and updated_at
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('question_option');
  };
  
