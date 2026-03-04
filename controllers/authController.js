module.exports = function createAuthController(deps) {
  const { db, bcrypt, jwt, JWT_SECRET, sanitizeInput, validatePassword, validateEmail } = deps;
  const userModel = require('../models/userModel')(db);

  async function register(req, res) {
    try {
      let { username, email, password } = req.body;
      username = sanitizeInput(username);
      email = sanitizeInput(email);

      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        return res.status(400).json({ error: passwordValidation.message });
      }

      if (!validateEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      try {
        const newId = await userModel.createUser(username, email, hashedPassword);
        const token = jwt.sign({ id: newId, username }, JWT_SECRET, { expiresIn: '24h' });
        return res.json({ message: 'User created successfully', token, username });
      } catch (err) {
        if (err && err.message && err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ error: 'Username or email already exists' });
        }
        return res.status(500).json({ error: 'Failed to create user' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Server error' });
    }
  }

  async function login(req, res) {
    try {
      let { username, password } = req.body;
      username = sanitizeInput(username);

      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
      }

      try {
        const user = await userModel.findByUsername(username);
        if (!user) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
        return res.json({ message: 'Login successful', token, username: user.username });
      } catch (err) {
        return res.status(500).json({ error: 'Database error' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Server error' });
    }
  }

  return { register, login };
};
