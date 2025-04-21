/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('question_domain', (table) => {
      table.increments('q_domain_id').primary(); // Auto-incrementing ID
      table.string('domain').notNullable();             // Domain name or label
      table.text('description');                  // Optional description
      table.text('svg');
      table.timestamps(true, true);                     // created_at and updated_at
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('question_domain');
  };  
