import 'dotenv/config';
import express from 'express';
import cors from 'cors';
// import config from './config';
import { v4 as uuidv4 } from 'uuid';
import bodyParser from 'body-parser';
import models from './models';
import routes from './routes';

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    req.context = {
        models
    };
    next();
});

app.use('/users', routes.user);
app.use('/messages', routes.message);
app.use('/quotes', routes.quote);

app.get('/messages', (req, res) => {
    res.send(Object.values(req.context.models.users));
});

app.get('/messages/:messageId', (req, res) => {
    res.send(req.context.models.users[req.params.userId]);
});

app.post('/messages', (req, res) => {
    const id = uuidv4();
    const message = {
        id,
        text: req.body.text,
        // serverMessage: req.serverMessage,
    };
    // messages[id] = message;
    req.context.models.messages[id] = message;
    res.send(message);
})

app.delete('/messages/:messageId', (req, res) => {
    const messageId = req.params.messageId;
    delete messages[messageId];
    res.send(`DELETE HTTP method on message/${messageId} resource`);
});


app.get('/', (req, res) => {
    res.send('Receive a GET Http method');
});

app.post('/', (req, res) => {
    res.send('Receive a POST Http method');
});

app.put('/', (req, res) => {
    res.send('Receive a PUT Http method');
});

app.delete('/', (req, res) => {
    res.send('Receive a DELETE Http method');
});

app.get('/users', (req, res) => {
    res.send(Object.values(req.context.models.users));
});

app.get('/users/:userId', (req, res) => {
    res.send(req.context.models.users[req.params.userId]);
});

app.post('/users', (req, res) => {
    res.send('POST HTTP method on user resource');
});

app.put('/users/:userId', (req, res) => {
    res.send(`PUT HTTP method on user/${req.params.userId} resource`);
});

app.delete('/users/:userId', (req, res) => {
    res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
});

// ----- Quotes -----
// app.get('/quotes', (req, res) => {
//     res.send(Object.values(req.context.models.quotes));
// })

// app.get('quotes/:id', (req, res) => {
//     res.send(req.context.models.quotes[req.params.quoteId]);
// });

// app.post('/quotes', (req, res) => {
//     const { id, quote, author, year } = req.body;
    
//     // Validate required fields
//     if (!id || !quote || !author || !year) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }
  
//     // Create a new quote object
//     const newQuote = {
//       id,
//       quote,
//       author,
//       year
//     };
//   // Add the new quote to the array
//   quotes.push(newQuote);
  
//   res.status(201).json(newQuote);
// });

app.listen(3000, () => {
    console.log(process.env.ENVIRONMENT);
    console.log('Example app listening on port 3000!');
});
