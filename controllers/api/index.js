const multer = require('multer');

const { validation: validationsPortal, controllers: controllersPortal } = require('./portal');
const { controllers } = require('./client');

const upload = multer();

module.exports = (router) => {
  router.get('/portal/:id', controllersPortal.detail);
  router.get('/portal', controllersPortal.list);
  router.put('/portal/:id', controllersPortal.update);
  router.post('/portal', validationsPortal.create, controllersPortal.create);
  router.post('/portal/upload', upload.single('excel'), controllersPortal.upload);
  router.delete('/portal:id', controllersPortal.delete);

  router.get('/today', controllers.getToday);
  router.get('/list/:month', controllers.getByMonth);
  router.get('/list', controllers.getAll);
  router.get('/:id', controllersPortal.detail);
};
