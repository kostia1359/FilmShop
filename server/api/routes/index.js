const descriptionRoutes = require('./descriptionRoutes');
const awardRoutes = require('./awardRoutes');
const genreRoutes = require('./genreRoutes');
const filmRoutes=require('./filmRoutes');
const userRoutes=require('./userRoutes');
const authenticationRoute=require('./authenticationRoute');
const contentRoute=require('./contentRoutes');

module.exports = (app) => {
    app.use('/api/description', descriptionRoutes);
    app.use('/api/award', awardRoutes);
    app.use('/api/genre', genreRoutes);
    app.use('/api/film', filmRoutes);
    app.use('/api/users', userRoutes);
    app.use('/users',authenticationRoute);
    app.use('/content',contentRoute);
}