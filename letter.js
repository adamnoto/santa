const nodemailer = require("nodemailer");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class represents a letter sent by a user
 */
class Letter {
  constructor(user, wish) {
    this.user = user;
    this.wish = wish;
  }

  /**
   * Add a new letter
   *
   * @param {User} user the user
   * @param {string} wish the user's wish
   */
  static addNewLetter(user, wish) {
    const letter = new Letter(user, wish);
    this.UNSENT_LETTERS.push(letter);
  }

  /**
   * This will send all letters as emails
   */
  static sendAllLetters() {
    while(this.UNSENT_LETTERS.length > 0) {
      const letter = this.UNSENT_LETTERS.pop();
      const { user, wish } = letter;
      console.log("Sending ", letter);

      const message = {
        from: "do_not_reply@northpole.com",
        to: "santa@northpole.com",
        subject: `🎁 Request from ${user.username} 😀👌`,
        text: `Hey santa~ I'm ${user.getAge()} years old. ` +
          `I want ${wish} for xmass. ` +
          `My home's address is:\n\n    ${user.address}.\n\nYay yay! 😊😊`
      }

      this.MAILER.sendMail(message, (err, info) => {
        if (err) {
          // we should send this kind of messages to sentry
          console.log("Error while sending message to santa", err);
        } else {
          console.log(info);
        }
      })
    }
  }
}

// can't define static fields in Glitch
_defineProperty(Letter, "UNSENT_LETTERS", []);
_defineProperty(Letter, "MAILER", nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'elwyn3@ethereal.email',
    pass: '4f1gjqgP9QzCQ9bd83'
  }
}));


module.exports = { Letter };

// email inbox:
// username: elwyn3@ethereal.email
// password: 4f1gjqgP9QzCQ9bd83
// name: Elwyn Pouros
