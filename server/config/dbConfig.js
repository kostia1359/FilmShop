const env=require('../env');

const config = env.db;
config['database']='testshop';
config['logging']=false;

module.exports=config;
