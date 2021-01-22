/**
 * This class represents a letter sent by a user
 */
class Letter {
  static UNSENT_LETTERS = [];

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
    console.log(this.UNSENT_LETTERS);
    while(this.UNSENT_LETTERS.length > 0) {
      const letter = this.UNSENT_LETTERS.pop();
      console.log("Sending ", letter);
    }
  }
}

module.exports = { Letter };
