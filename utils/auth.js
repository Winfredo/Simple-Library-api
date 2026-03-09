import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const GenerateBcryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const HashedPassword = await bcrypt.hash(password, salt);
  return HashedPassword;
};

export const CompareBcryptPassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

export const GenerateAuthToken = (userId, role) => {
  console.log('Generating auth token for userId:', userId, 'with role:', role, "with expiration:", process.env.JWT_ACCESS_EXPIRATION); // Debugging log
  const accessToken = jwt.sign({ userId, role }, process.env.JWS_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRATION || '15m',
  });
  const refreshToken = jwt.sign({ userId, role }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRATION || '7d',
  });

  return ({
    accessToken,
    refreshToken
  })
};  

export const VerifyAuthToken = (token, type = 'access') => {
  try {
    const secret = type === 'access' ? process.env.JWS_ACCESS_SECRET : process.env.JWT_REFRESH_SECRET;
    const decoded = jwt.verify(token, secret);
    const now = Date.now() / 1000;
    console.log('Decoded token:', decoded, { now }); // Debugging log
    return decoded;
  } catch (error) {
    throw new Error(error.message || 'Invalid token');
  }
};