const moment = require("moment");
const request = require('request');

class User {
  static USERS_ENDPOINT = "https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json";
  static PROFILES_ENDPOINT = "https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json"

  constructor(id, username, address, birthdate) {
    this.id = id;
    this.username = username;
    this.address = address;

    if (birthdate) {
      this.birthdate = moment(birthdate).format("YYYY/DD/MM");
    }
  }

  /**
   * This function returns a Promise. The Promise contains a User ID
   * if the user exists in the "database." Otherwise, the Promise returns null.
   * If there's any error, it will reject.
   * @param {String} userName the Username of the user
   */
  static findUserIdByUsername(userName) {
    return new Promise((resolve, reject) => {
      if (!userName) { resolve(null); }

      request(this.USERS_ENDPOINT, {json: true}, (err, res, body) => {
        const allUsers = body;

        if (res.statusCode >= 300 || res.statusCode < 200) {
          return reject("Error while fetching the User ID. Down?");
        }

        if (allUsers) {
          const user = allUsers.find(u => u.username == userName);
          const userId = user.uid;
          resolve(userId);
        } else {
          resolve(null);
        }
      });
    })
  }

  /**
   * This function returns a Promise. The Promise contains a User instance
   * if the user exists in the "database." Otherwise, the Promise returns null.
   * If there's any error, it will reject.
   * @param {String} userName the username
   */
  static findByUsername(userName) {
    return new Promise((resolve, reject) => {
      if (!userName) { Promise.resolve(null); }
      this.findUserIdByUsername(userName).then((userId) => {
        request(this.PROFILES_ENDPOINT, {json: true}, (err, res, body) => {
          const allProfiles = body;

          if (res.statusCode >= 300 || res.statusCode < 200) {
            return reject(`Error while fetching the Profile for User#${userId}. Down?`);
          }

          if (allProfiles) {
            const profile = allProfiles.find(u => u.userUid == userId);
            resolve(new User(userId, userName, profile.address, profile.birthdate));
          } else {
            resolve(null);
          }
        })
      }).catch((reason) => {
        reject(reason);
      })
    })
  }

  /**
   * Check if the user is registered
   */
  isRegistered() {

  }

  /**
   * Check if the the user is less than 10 years old
   */
  isNotOld() {

  }
}

module.exports = { User }
