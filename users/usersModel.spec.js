const Users = require('./usersModel.js');

const db = require('../data/dbConfig.js');

it('should set testing environment', () => {
  expect(process.env.DB_ENV).toBe('testing');
});

describe('users model', () => {
  // beforeAll()
  beforeEach(async () => {
    await db('users').truncate();
  });
  // afterEach()
  // afterAll()

  describe('insert()', () => {
    it('should add user to database', async () => {
      // check that table is empty
      const records = await db('users');
      expect(records).toHaveLength(0);

      // insert one record
      await Users.insert({ name: 'Jane' });

      // check we now have one record in the table
      const users = await db('users');
      expect(users).toHaveLength(1);
    });
  });

  it('should add the provided user to database ', async () => {
    let user = await Users.insert({ name: 'Jane' });
    expect(user.name).toBe('Jane');

    user = await Users.insert({ name: 'Jason' });
    expect(user.name).toBe('Jason');

    const users = await db('users');
    expect(users).toHaveLength(2);

  });
  it('should remove the provided user from database ', async () => {
    let user = await Users.insert({ name: 'Jane' });
    expect(user.name).toBe('Jane');

     await Users.remove({ id: '1' });
    

    const users = await db('users');
    expect(users).toHaveLength(1);

  });

});





