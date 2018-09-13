module.exports = app => {

  // 定义collection，用于存储session
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const SessionSchema = new Schema({
    data: {type: String}, // session内容
    s_id: {type: String}, // sessionId
    expire: { // 过期时间
      type: Date,
      default: Date.now, expires: '0'
    },
  });

  mongoose.model(app.config.sessionMongoose.name, SessionSchema);

  //实现sessionStore
  app.sessionStore = {
    async get(key) { // 读session
      return new Promise((resolve, reject) => {
        // 跟据sessionId查找session
        mongoose.models.Session.findOne({s_id: key}, (err, session) => {
          if (err) {
            console.error(err);
            resolve(null);
            return;
          }

          //返回session结果，不存在时返回null
          if (session) {
            resolve(JSON.parse(session.data))
          } else {
            resolve(null);
          }
        });
      })
    },
    async set(key, value, maxAge) { // 写session
      // 序列化session内容
      let saveValue = JSON.stringify(value);
      // 跟据当前时间和maxAge计算过期时间
      let saveExpire = new Date(new Date().getTime() + maxAge);
      // 跟据sessionId查找并更新session。查询不到则插入新记录
      await mongoose.models.Session.findOneAndUpdate({s_id: key,}, {
        data: saveValue,
        expire: saveExpire
      }, {upsert: true}, (err, session) => {
        if (err) {
          console.error(err);
        }
      });
    },
    async destroy(key) {
      // 销毁session
      await mongoose.models.Session.remove({s_id: key})
    },
  };
};