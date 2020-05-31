const descriptionRoutes = require('./descriptionRoutes');

module.exports = (app) => {
    app.use('/api/description', descriptionRoutes);
}