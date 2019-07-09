const { httpStatus } = require('../../configs/code');
const { reflectionStatus, sheetName } = require('../../configs/app');

const Reflection = require('../../models/reflection');

const { convertExcelToJSON, readExcelFile } = require('./../../libs/helper');

const validation = {
  create: async (req, res, next) => {
    req.checkBody({
      title: { notEmpty: true, errorMessage: 'title field is required' },
      body: { notEmpty: true, errorMessage: 'body field is required' },
      publishDate: { notEmpty: true, errorMessage: 'publishDate field is required' }
    });

    const errors = req.validationErrors();
    if (errors) {
      return res.status(httpStatus.badRequest).json({
        success: false,
        code: 99,
        message: 'Missing Parameters!',
        error: errors,
      });
    }

    return next();
  }
};

const controllers = {
  create: async (req, res, next) => {
    const {
      title,
      body,
      publishDate,
      author,
      verse
    } = req.body;
    let result;

    try {
      result = await Reflection.create({
        title,
        body,
        verse,
        author,
        publishDate,
        status: reflectionStatus.ACTIVE
      });
    } catch (e) {
      return next(e);
    }

    return res.status(httpStatus.ok).json({
      status: httpStatus.ok,
      success: true,
      message: 'Successfully create reflection data',
      data: result
    });
  },

  update: async (req, res, next) => {
    const { id } = req.params;
    let result;

    try {
      result = await Reflection.findByIdAndUpdate(id, {
        $set: {
          ...req.body
        }
      });
    } catch (e) {
      return next(e);
    }

    return res.status(httpStatus.ok).json({
      status: httpStatus.ok,
      success: true,
      message: 'Successfully update reflection data',
      data: result
    });
  },

  list: async (req, res, next) => {
    const { page, sort, order } = req.query;
    let result;

    const options = {
      page,
      sort: {
        [sort]: order === 'ASC' ? 1 : -1
      }
    };

    try {
      result = await Reflection.paginate({
        status: {
          $ne: reflectionStatus.DELETE
        }
      }, options);
    } catch (e) {
      return next(e);
    }

    return res.status(httpStatus.ok).json({
      status: httpStatus.ok,
      success: true,
      message: 'Successfully get list reflection',
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

  delete: async (req, res, next) => {
    const { id } = req.params;
    let result;

    try {
      result = await Reflection.findByIdAndUpdate(id, {
        $set: {
          status: reflectionStatus.DELETE
        }
      });
    } catch (e) {
      return next(e);
    }

    return res.status(httpStatus.ok).json({
      status: httpStatus.ok,
      success: true,
      message: 'Successfully delete reflection data',
      data: result
    });
  },

  upload: async (req, res, next) => {
    try {
      const jsonData = await readExcelFile(req.file.buffer, sheetName);

      // const result = await Reflection.collection.insertMany(jsonData);

      return res.status(httpStatus.ok).json({
        status: httpStatus.ok,
        success: true,
        message: 'Successfully insert data with xlsx file',
        data: jsonData
      });
    } catch (e) {
      return next(e);
    }
  }
};

module.exports = {
  validation,
  controllers
};
