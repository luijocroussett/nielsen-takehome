module.exports = {
  getRate: (req, res, next) => {
    let time_rate = Math.random() * 0.5;
    let distance_rate = Math.random() * 0.5;
    let { distance } = res.locals;
    let { started_at } = res.locals.result;
    let ended_at = Date.now();

    // distance validation
    if (distance === undefined) return res.status(400).send('no distance');
    price =
      ((time_rate / 60) * (Date.parse(started_at) - ended_at)) / 1000000 +
      distance * distance_rate;
    ended_at = new Date(ended_at);
    ended_at = ended_at.toISOString();
    res.locals = {
      ...res.locals,
      time_rate,
      distance_rate,
      ended_at,
      price,
      status: 'completed',
    };
    next();
  },
};
