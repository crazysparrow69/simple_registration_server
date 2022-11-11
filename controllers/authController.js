const bcrypt = require('bcrypt');

const usersDB = {
  users: require('../models/usersDB.json'),
  setUsers: function (data) { this.users = data }
};

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ 'message': 'Username and password required' });

  const foundUser = usersDB.users.find(person => person.username === username);
  if (!foundUser) return res.status(409).json({ 'message': "User with that name doesn't exist" });

  const validity = await bcrypt.compare(password, foundUser.password);
  if (validity) {
    res.json({ 'success': `User ${username} is logged in!` });
  } else {
    res.sendStatus(401);
  }
};

module.exports = handleLogin;