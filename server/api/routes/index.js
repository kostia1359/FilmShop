const descriptionRoutes = require('./descriptionRoutes');
const awardRoutes = require('./awardRoutes');
const genreRoutes = require('./genreRoutes');

module.exports = (app) => {
    app.use('/api/description', descriptionRoutes);
    app.use('/api/award', awardRoutes);
    app.use('/api/genre', genreRoutes);
}