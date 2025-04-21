/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('question', (table) => {
      table.increments('question_id').primary();  // Auto-incrementing ID
  
      // Foreign key to question_domain
      table
        .integer('q_domain_id')
        .unsigned()
        .notNullable()
        .references('q_domain_id')
        .inTable('question_domain')
        .onDelete('CASCADE');
  
      // Foreign key to answer_type
      table
        .integer('answer_type_id')
        .unsigned()
        .notNullable()
        .references('answer_type_id')
        .inTable('answer_type')
        .onDelete('CASCADE');
  
      table.string('title').notNullable();        // Question title
      table.timestamps(true, true);               // created_at and updated_at
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('question');
  };
  
