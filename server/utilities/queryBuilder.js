module.exports = {
  /**
   * **********************
   @author Luis Croussett

   @method buildInsertQuery
   @param {Object} columns
   @param {String} table_name
   @returns {Object} 
      @property {String} query
      @property {Array} values
      @example { 
                query: `INSERT INTO table_name(columns...) 
                        VALUES(values...) 
                        RETURNING *;`,
                values: [values...] }
   */

  buildInsertQuery: (columns, table_name) => {
    // parameter validation
    let error = '';
    if (typeof columns !== 'object' || Array.isArray(columns) || !columns)
      error += `columns: ${columns}`;
    if (typeof table_name !== 'string' || !table_name.match(/[az]/gi))
      error += `table_name: ${table_name}`;
    if (error)
      return new Error('*** ERROR @ #buildInsertQuery: ' + error + ' ***');

    const rows = [];
    const values = [];
    const available_values = [];
    for (let column in columns) {
      if (columns[column]) {
        rows.push(column);
        values.push(columns[column]);
        available_values.push(`$${values.length}`);
      }
    }
    return {
      query: `INSERT INTO ${table_name}(${rows.join(
        ',',
      )}) VALUES(${available_values.join(',')}) RETURNING *;`,
      values,
    };
  },

  /**
   * **********************
   @author Luis Croussett

   @method buildUpdateQuery
   @param {Object}  columns
   @param {String}  table_name
   @param {String}  filter_colum
   @param {String}  filter_value
   @returns {Object} 
      @property {String} query
      @property {Array} values
      @example { 
                query :`UPDATE table_name SET(columns...) 
                VALUES(values...) 
                WHERE filter_colum=filter_value 
                RETURNING *;`,
                values : [values...] 
              } 
   */
  buildUpdateQuery: (columns, table_name, filter_column, filter_value) => {
    // parameter validation
    let error = '';
    if (typeof columns !== 'object' || Array.isArray(columns) || !columns)
      error += `columns: ${columns}`;
    if (typeof table_name !== 'string' || !table_name.match(/[az]/gi))
      error += `table_name: ${table_name}`;
    if (typeof filter_column !== 'string' || !filter_column.match(/[a-z]/gi))
      error += `filter_column: ${filter_column}`;
    if (typeof filter_value !== 'string' || !filter_value.match(/[a-z]/gi))
      error += `filter_value: ${filter_value}`;
    if (error)
      return new Error('*** ERROR @ #buildSelectQuery: ' + error + '***');

    const rows = [];
    const values = [];
    for (let column in columns) {
      if (columns[column]) {
        rows.push(`${column}=$${rows.length + 1}`);
        values.push(columns[column]);
      }
    }
    return {
      query: `UPDATE ${table_name} SET ${rows.join(
        ',',
      )} WHERE ${filter_column}=${filter_value};`,
      values,
    };
  },

  /**
   * **********************
   @author Luis Croussett

   @method buildSelectQuery
   @param {String}  table_name
   @param {String}  filter_colum
   @param {String}  [filter_value]
   @param {String}  type
   @param {Object}  
      @property {String} [sortBy]
      @property {String=}  [order]
      @property {Array=}  [operations]
      @property {String=}  [from]
      @property {String=}  [to]
   @returns {String} `SELECT columns FROM table_name 
                     WHERE filter_column=filter_value 
                     RETURNING *;`
   */

  buildSelectQuery: (
    table_name,
    filter_column,
    filter_value,
    type,
    options = { sortBy: '', order: '', operations: [], from: '', to: '' },
  ) => {
    // argument validation
    let { sortBy, order, operations, from, to } = options;
    if (
      !table_name ||
      !filter_column ||
      !filter_value ||
      !type ||
      typeof table_name !== 'string' ||
      typeof filter_column !== 'string' ||
      typeof filter_value !== 'string' ||
      typeof type !== 'string' ||
      typeof sortBy !== 'string' ||
      typeof from !== 'string' ||
      typeof to !== 'string' ||
      typeof order !== 'string' ||
      !Array.isArray(operations)
    ) {
      let error = '*** ERROR @ #buildSelectQuery: ';
      if (!filter_column || typeof filter_column !== 'string')
        error += `filter_column: ${filter_column}`;
      if (!filter_value || typeof filter_value !== 'string')
        error += `filter_value: ${filter_value}`;
      if (!table_name || typeof table_name !== 'string')
        error += `table_name: ${table_name}`;
      if (!type || typeof type !== 'string') error += `type: ${type}`;
      if (typeof sortBy !== 'string') error += `sortBy: ${sortBy}`;
      if (typeof to !== 'string') error += `to: ${to}`;
      if (typeof from !== 'string') error += `from: ${from}`;
      if (typeof order !== 'string') error += `order: ${order}`;
      if (!Array.isArray(operations)) error += `operations: ${operations}`;
      return new Error(error + ' ***');
    }

    let query = '';
    switch (type) {
      case 'all':
        query += `SELECT * FROM ${table_name} `;
        if (
          filter_column &&
          filter_value &&
          typeof filter_column !== 'object' &&
          typeof filter_value !== 'object'
        )
          query += `WHERE ${filter_column}=${filter_value}`;
        else if (
          filter_column &&
          filter_value &&
          typeof filter_column === 'object' &&
          typeof filter_value === 'object'
        ) {
          query += 'WHERE ';
          for (let index in filter_column) {
            query += `${operations[index]} `;
            query += `${filter_column[index]}=${filter_value[index]} `;
          }
        }
        break;

      case 'between':
        if (!filter_column || !from || !to || !sortBy) {
        }
        query += `SELECT * FROM ${table_name} WHERE ${filter_column} BETWEEN ${from} AND ${to}`;
        if (sortBy) query += ` ORDER BY ${sortBy}`;
        if (order) query += ` ${order}`;
        break;
      default:
        return new Error('wrong type paramenter');
    }
    // if query is not empty add semi-colon at the end
    return query
      ? query + ';'
      : new Error('*** ERROR @ #buildSelectQuery: no colums ***');
  },
};
