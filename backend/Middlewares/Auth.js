const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];

    if (!authHeader) {
        return res.status(403).json({
            message: 'Unauthorized: JWT token is required',
        });
    }

    // Extract the token from the "Bearer" prefix
    const token = authHeader.startsWith('Bearer ')
        ? authHeader.slice(7) // Remove "Bearer " prefix
        : authHeader;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded payload to the request
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error('JWT verification failed:', err); // Log the error for debugging
        return res.status(403).json({
            message: 'Unauthorized: JWT token is invalid or expired',
        });
    }
};

module.exports = ensureAuthenticated;
