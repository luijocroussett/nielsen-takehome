const {
  buildInsertQuery,
  buildUpdateQuery,
  buildSelectQuery,
} = require('../server/utilities/queryBuilder');

describe('Test #buildInsertQuery', () => {
  const columns = { column1: 'value1', column2: 'value2' };
  const table_name = 'appointments';
  describe('Argument validation', () => {
    it('returns an error if columns parameter is not the right type', () => {
      let result = buildInsertQuery(['column 1', 'column 2'], table_name);
      expect(result).toBeInstanceOf(Error);
      result = buildInsertQuery('column', table_name);
      expect(result).toBeInstanceOf(Error);
      result = buildInsertQuery(1, table_name);
      expect(result).toBeInstanceOf(Error);
      result = buildInsertQuery(false, table_name);
      expect(result).toBeInstanceOf(Error);
    });
    it('returns an error if table_name parameter is not the right type', () => {
      let result = buildInsertQuery(columns, '');
      expect(result).toBeInstanceOf(Error);
      result = buildInsertQuery(columns, 1);
      expect(result).toBeInstanceOf(Error);
      result = buildInsertQuery(columns, false);
      expect(result).toBeInstanceOf(Error);
      result = buildInsertQuery(columns, [false]);
      expect(result).toBeInstanceOf(Error);
      result = buildInsertQuery(columns, { false: false });
      expect(result).toBeInstanceOf(Error);
    });
    it('returns an object with a "query" and "values" property when given the right params', () => {
      let result = buildInsertQuery(columns, table_name);
      expect(typeof result).toEqual('object');
      expect(typeof result.query).toEqual('string');
      expect(Array.isArray(result.values)).toEqual(true);
      expect(Object.keys(result)).toEqual(['query', 'values']);
    });
  });
  describe('Query validation', () => {
    it('creates the correct INSERT query when given the correct arguments', () => {
      let { query, values } = buildInsertQuery(columns, table_name);
      expect(query).toEqual(
        'INSERT INTO appointments(column1,column2) VALUES($1,$2) RETURNING *;',
      );
      expect(values).toEqual(['value1', 'value2']);
    });
  });
});

describe('Test #buildUpdateQuery', () => {
  const columns = { column1: 'value1', column2: 'value2' };
  const table_name = 'appointments';
  const filter_column = 'filter';
  const filter_value = 'value';
  describe('Argument validation', () => {
    it('returns an error if filter_value is not the right type', () => {
      let result = buildUpdateQuery(columns, 'column', 'value', {});
      expect(result).toBeInstanceOf(Error);
      result = buildUpdateQuery(columns, 'column', 'value', []);
      expect(result).toBeInstanceOf(Error);
      result = buildUpdateQuery(columns, 'column', 'value', false);
      expect(result).toBeInstanceOf(Error);
      result = buildUpdateQuery(columns, 'column', 'value', 1);
      expect(result).toBeInstanceOf(Error);
    });

    it('returns an error if columns parameter is not the right type or the right string', () => {
      let result = buildUpdateQuery({}, 'column', 'value', 'all');
      expect(result).toBeInstanceOf(Error);
      result = buildUpdateQuery([], 'column', 'value', 'all');
      expect(result).toBeInstanceOf(Error);
      result = buildUpdateQuery(1, 'column', 'value', 'all');
      expect(result).toBeInstanceOf(Error);
      result = buildUpdateQuery(true, 'column', 'value', 'between');
      expect(result).toBeInstanceOf(Error);
    });

    it('returns an error if filter_column parameter is not the right type', () => {
      let result = buildUpdateQuery('appointments', {}, 'value', 'all');
      expect(result).toBeInstanceOf(Error);
      result = buildUpdateQuery('appointments', [], 'value', 'all');
      expect(result).toBeInstanceOf(Error);
      result = buildUpdateQuery('appointments', 1, 'value', 'all');
      expect(result).toBeInstanceOf(Error);
      result = buildUpdateQuery('appointments', true, 'value', 'between');
      expect(result).toBeInstanceOf(Error);
    });

    it('returns an error if filter_value parameter is not the right type', () => {
      let result = buildUpdateQuery(columns, 'column', {}, 'all');
      expect(result).toBeInstanceOf(Error);
      result = buildUpdateQuery(columns, 'column', [], 'all');
      expect(result).toBeInstanceOf(Error);
      result = buildUpdateQuery(columns, 'column', 1, 'all');
      expect(result).toBeInstanceOf(Error);
      result = buildUpdateQuery(columns, 'column', true, 'between');
      expect(result).toBeInstanceOf(Error);
    });

    it('returns an object with a "query" and "values" property when given the right params', () => {
      let result = buildUpdateQuery(
        columns,
        table_name,
        filter_column,
        filter_value,
      );
      expect(typeof result).toEqual('object');
      expect(typeof result.query).toEqual('string');
      expect(Array.isArray(result.values)).toEqual(true);
      expect(Object.keys(result)).toEqual(['query', 'values']);
    });
  });

  describe('Query validation', () => {
    it('creates the correct UPDATE query when given the correct arguments', () => {
      let { query, values } = buildUpdateQuery(
        columns,
        table_name,
        filter_column,
        filter_value,
      );
      expect(query).toEqual(
        'UPDATE appointments SET column1=$1,column2=$2 WHERE filter=value;',
      );
      expect(values).toEqual(['value1', 'value2']);
    });
  });
});

describe('Test #buildSelectQuery', () => {
  describe('Argument validation', () => {
    it('returns an error if type is not the right type', () => {
      let result = buildSelectQuery('appointements', 'column', 'value', {});
      expect(result).toBeInstanceOf(Error);
      result = buildSelectQuery('appointements', 'column', 'value', []);
      expect(result).toBeInstanceOf(Error);
      result = buildSelectQuery('appointements', 'column', 'value', false);
      expect(result).toBeInstanceOf(Error);
      result = buildSelectQuery('appointements', 'column', 'value', 1);
      expect(result).toBeInstanceOf(Error);
    });

    it('returns an error if table_name parameter is not the right type or the right string', () => {
      let result = buildSelectQuery({}, 'column', 'value', 'all');
      expect(result).toBeInstanceOf(Error);
      result = buildSelectQuery([], 'column', 'value', 'all');
      expect(result).toBeInstanceOf(Error);
      result = buildSelectQuery(1, 'column', 'value', 'all');
      expect(result).toBeInstanceOf(Error);
      result = buildSelectQuery(true, 'column', 'value', 'between');
      expect(result).toBeInstanceOf(Error);
    });

    it('returns an error if filter_column parameter is not the right type', () => {
      let result = buildSelectQuery('appointments', {}, 'value', 'all');
      expect(result).toBeInstanceOf(Error);
      result = buildSelectQuery('appointments', [], 'value', 'all');
      expect(result).toBeInstanceOf(Error);
      result = buildSelectQuery('appointments', 1, 'value', 'all');
      expect(result).toBeInstanceOf(Error);
      result = buildSelectQuery('appointments', true, 'value', 'between');
      expect(result).toBeInstanceOf(Error);
    });

    it('returns an error if filter_value parameter is not the right type', () => {
      let result = buildSelectQuery('appointements', 'column', {}, 'all');
      expect(result).toBeInstanceOf(Error);
      result = buildSelectQuery('appointements', 'column', [], 'all');
      expect(result).toBeInstanceOf(Error);
      result = buildSelectQuery('appointements', 'column', 1, 'all');
      expect(result).toBeInstanceOf(Error);
      result = buildSelectQuery('appointements', 'column', true, 'between');
      expect(result).toBeInstanceOf(Error);
    });

    it('returns string with a valid SELECT query statement when given the right params', () => {
      let query = buildSelectQuery('appointments', 'column', 'value', 'all');
      expect(typeof query).toEqual('string');
    });
  });

  describe('Query validation', () => {
    it('creates the correct SELECT query with a single filter_column and filter_value', () => {
      let query = buildSelectQuery('appointments', 'column', 'value', 'all');
      expect(query).toEqual('SELECT * FROM appointments WHERE column=value;');
    });

    it('creates the correct SELECT query with multiple filter_column and filter_value', () => {
      let query = buildSelectQuery(
        'appointments',
        'column',
        'value',
        'between',
        {
          order: 'ASC',
          from: 'start',
          to: 'end',
          sortBy: 'time',
          operations: [],
        },
      );
      expect(query).toEqual(
        'SELECT * FROM appointments WHERE column BETWEEN start AND end ORDER BY time ASC;',
      );
    });
  });
});
