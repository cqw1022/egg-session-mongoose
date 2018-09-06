module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const SessionSchema = new Schema({
    data: {type: String},
    s_id: {type: String},
    expire: {
      type: Date,
      default: Date.now, expires: '0'
    },
  });

  mongoose.model(app.config.sessionMongoose.name, SessionSchema);

  app.sessionStore = {
    async get(key) {
      return new Promise((resolve, reject) => {
        console.log('call get')
        mongoose.models.Session.findOne({s_id: key}, (err, session) => {
          if (err) {
            console.error(err);
            resolve(null);
            return;
          }
          if (session) {
            resolve(JSON.parse(session.data))
          } else {
            resolve(null);
          }
        });
      })
    },
    async set(key, value, maxAge) {
      let saveValue = JSON.stringify(value);
      let saveExpire = new Date(new Date().getTime() + maxAge);
      mongoose.models.Session.findOneAndUpdate({s_id: key,}, {
        data: saveValue,
        expire: saveExpire
      }, {upsert: true}, (err, session) => {
        if (err) {
          console.error(err);
        }
      });
    },
    async destroy(key) {
      mongoose.models.Session.remove({s_id: key})
    },
  };
};