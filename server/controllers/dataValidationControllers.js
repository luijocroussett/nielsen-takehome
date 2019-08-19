module.exports = {
  getCurrentDriverAppointments: (req, res, next) => {
    const { id } = req.params;
    const { driver_id, user_id } = req.body;
    res.locals = {
      ...res.locals,
      id,
      driver_id,
      user_id,
      type: 'all',
      filter_column: ['driver_id', 'status'],
      filter_value: [driver_id, "'completed'"],
      operations: ['', 'AND NOT'],
    };
    next();
  },
  // verifies if driver is available
  isDriverFree: (req, res, next) => {
    if (Object.keys(res.locals.result).length)
      return res.status(400).send('driver is busy');
    next();
  },
  // set params for time search
  getTimeParams: (req, res, next) => {
    let { from, to, sortBy, order } = req.params;
    // parameter validation
    if (from === undefined || to === undefined || sortBy === undefined)
      return res.status(400).send('missing parameters');
    from = `'${new Date(from).toISOString()}'`;
    to = `'${new Date(to).toISOString()}'`;
    res.locals = {
      ...res.locals,
      from,
      to,
      sortBy,
      type: 'between',
      order,
      filter_column: 'created_at',
    };
    next();
  },

  getAppointmentParams: (req, res, next) => {
    const { id } = req.params;
    res.locals = {
      ...res.locals,
      type: 'all',
      filter_column: 'appointment_id',
      filter_value: id,
    };
    next();
  },

  getEndParams: (req, res, next) => {
    const { status } = res.locals.result;
    if (status === 'open')
      return res.status(400).send('Appointment has not started');
    else if (status === 'completed')
      return res.status(400).send('Appointment already ended');
    const { id } = req.params;
    const { distance } = req.body;
    res.locals = {
      ...res.locals,
      distance,
      status: 'completed',
    };
    next();
  },
  getStartParams: (req, res, next) => {
    const { status } = res.locals.result;
    if (status === 'in progress')
      return res.status(400).send('Appointment already started');
    else if (status === 'completed')
      return res.status(400).send('Appointment already ended');
    const started_at = new Date(Date.now()).toISOString();
    res.locals = {
      ...res.locals,
      started_at,
      status: 'in progress',
    };
    next();
  },
  getUpdateParams: (req, res, next) => {
    const { id } = req.params;
    // sanitizing data
    const { user_id, car_id, started_at, distance } = req.body;
    res.locals = {
      ...res.locals,
      filter_column: 'appointment_id',
      status: 'in progress',
      distance_rate,
      time_rate,
      ended_at,
      price,
      status,
      user_id,
      car_id,
      started_at,
      distance,
      id,
    };
    next();
  },
};
