const moment = require('moment');

const { httpStatus } = require('../../configs/code');
const { reflectionStatus } = require('../../configs/app');

const Reflection = require('../../models/reflection');

const controllers = {
  getToday: async (req, res, next) => {
    let result;

    try {
      result = await Reflection.findOne({
        publishDate: moment().format('YYYY-MM-DD')
      });
    } catch (e) {
      return next(e);
    }

    return res.status(httpStatus.ok).json({
      status: httpStatus.ok,
      success: true,
      message: 'Successfully get today reflection data',
      data: result
    });
  },

  getByMonth: async (req, res, next) => {
    const { month } = req.params;
    let result;

    try {
      result = await Reflection.find({
        $expr: {
          $eq: [{
            $month: '$publishDate'
          }, parseInt(month, 10)]
        }
      });
    } catch (e) {
      return next(e);
    }

    return res.status(httpStatus.ok).json({
      status: httpStatus.ok,
      success: true,
      message: 'Successfully get this month reflection data',
      data: result
    });
  },

  detail: async (req, res, next) => {
    const { id } = req.params;
    let result;

    try {
      result = await Reflection.findById(id);
    } catch (e) {
      return next(e);
    }

    return res.status(httpStatus.ok).json({
      status: httpStatus.ok,
      success: true,
      message: 'Successfully get detail reflection',
      data: result
    });
  },

  getAll: async (req, res, next) => {
    let result;

    try {
      result = await Reflection.find({ status: reflectionStatus.ACTIVE });
    } catch (e) {
      return next(e);
    }

    return res.status(httpStatus.ok).json({
      status: httpStatus.ok,
      success: true,
      message: 'Successfully get this all list devotional data',
      data: result
    });
  }
};

module.exports = {
  controllers
};
