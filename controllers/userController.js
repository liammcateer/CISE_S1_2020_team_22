//export modules
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 300000,
  });
};

//signup normal users
exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const token = createToken(newUser._id);
    jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: 300000,
    });

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

//User login function
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(404).json({
        status: 'failed',
        message: 'Please enter your username and password',
      });
    }

    const user = await User.findOne({ email }).select('+password');

    const token = createToken(user._id);

    if (password !== user.password || !user) {
      res.status(400).json({
        status: 'fair',
        message: 'incorrect password or username',
      });
    }

    res.status(200).json({
      status: 'success',
      token,
      email: user.email,
      type: user.type,
      name: user.name,
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.submitArticle = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.updateArticle = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

//List all the users, use by administrator
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

//this method is used by administrator to create accounts. NO CACHE
exports.signupByAdmin = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

//check login middleware
exports.authorize_submitter = async (req, res, next) => {
  try {
    let token;

    //check if the token is existed.
    if (req.headers.authorization) {
      token = req.headers.authorization;
    }
    if (!token) {
      res.status(404).json({
        status: 'failed',
        message: 'unauthorized access, no token',
      });
    }

    //check data
    // eslint-disable-next-line camelcase
    const decoded_data = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(decoded_data);

    /*IMPORTANT*/
    const checkUser = User.findById(decoded_data.id);
    if (!checkUser) {
      res.status(404).json({
        status: 'failed',
        message: 'User does not access',
      });
    }
    if (checkUser.type === 'submitter') {
      res.status(404).json({
        status: 'failed',
        message: 'The user does not have right permission to submit article',
      });
    }

    next();
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};
