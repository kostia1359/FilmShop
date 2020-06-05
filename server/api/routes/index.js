const descriptionRoutes = require('./descriptionRoutes');
const awardRoutes = require('./awardRoutes');
const genreRoutes = require('./genreRoutes');
const filmRoutes=require('./filmRoutes');

module.exports = (app) => {
    app.use('/api/description', descriptionRoutes);
    app.use('/api/award', awardRoutes);
    app.use('/api/genre', genreRoutes);
    app.use('/api/film', filmRoutes);
}