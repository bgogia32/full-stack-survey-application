/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('answer', (table) => {
      table.increments('answer_id').primary();  // Auto-incrementing ID
      table.string('email').notNullable();      // Respondent's email
      table.string('answer').notNullable();     // Answer value (can adjust based on type later)
      table.timestamps(true, true);             // created_at and updated_at
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('answer');
  };
  
