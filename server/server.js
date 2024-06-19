const app = require('./index');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));