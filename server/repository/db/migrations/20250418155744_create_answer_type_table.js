/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('answer_type', (table) => {
      table.increments('answer_type_id').primary();  // Auto-incrementing ID
      table.string('answer_type').notNullable();     // E.g., 'text', 'radio', 'checkbox'
      table.timestamps(true, true);                  // created_at and updated_at
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('answer_type');
  };
  
