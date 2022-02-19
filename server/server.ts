import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Casey Price is always watching you');
})

app.listen(8000, () => {
    console.log('The application is listening on port 8000!');
})