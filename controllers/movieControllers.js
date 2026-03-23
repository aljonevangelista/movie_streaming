const connection = require('../config/db.js');

// Get all users
exports.getAllUsers = (req, res) => {
    connection.query('SELECT * FROM movie_streaming', (err, rows) => {
        if (err) throw err;
        res.json(rows);
    });
};

// Get user by ID
exports.getUserById = (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM movie_streaming WHERE id=?', [id], (err, rows) => {
        if (err) throw err;
        if (rows.length > 0) res.json(rows);
        else res.status(404).json({ message: 'User not found' });
    });
};

// Get users by genre
exports.getUserByGenre = (req, res) => {
    const genre = req.params.genre;
    connection.query('SELECT * FROM movie_streaming WHERE genre=?', [genre], (err, rows) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (rows.length > 0) res.json(rows);
        else res.status(404).json({ message: 'No records found for this genre' });
    });
};

// Create new user
exports.createUser = (req, res) => {
    const { user_name, movie_title, genre, subscription_type, device_used, rating } = req.body;
    connection.query(
        'INSERT INTO movie_streaming (user_name, movie_title, genre, subscription_type, device_used, rating) VALUES (?, ?, ?, ?, ?, ?)',
        [user_name, movie_title, genre, subscription_type, device_used, rating],
        (err, result) => {
            if (err) throw err;
            res.json({ message: 'User Created Successfully', userId: result.insertId });
        }
    );
};

// Update user
exports.updateUser = (req, res) => {
    const id = req.params.id;
    const { user_name, movie_title, genre, subscription_type, device_used, rating } = req.body;

    connection.query(
        'UPDATE movie_streaming SET user_name=?, movie_title=?, genre=?, subscription_type=?, device_used=?, rating=? WHERE id=?',
        [user_name, movie_title, genre, subscription_type, device_used, rating, id],
        (err, result) => {
            if (err) throw err;
            if (result.affectedRows > 0)
                res.json({ message: 'User Updated Successfully' });
            else
                res.status(404).json({ message: 'User not found' });
        }
    );
};

// Delete user
exports.deleteUser = (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM movie_streaming WHERE id=?', [id], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0)
            res.json({ message: 'User Deleted Successfully' });
        else
            res.status(404).json({ message: 'User not found' });
    });
};
