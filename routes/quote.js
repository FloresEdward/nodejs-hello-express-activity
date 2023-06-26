import { Router } from 'express';
import {v4 as uuidv4} from 'uuid';
import models from '../models';
import bodyParser from 'body-parser';

const router = Router();

router.use((req, res, next) => {
    req.context = {
        models
    };
    next();
});
// ----- Quotes ----- //
router.get('/', (req, res) => {
    res.send(Object.values(req.context.models.quotes));
})

router.get('/:id', (req, res) => {
    res.send(req.context.models.quotes[req.params.quoteId]);
});

let quotes = [];

// router.post('/', (req, res) => {
//     const { id, quote, author, year } = req.body;
    
//     if (!id || !quote || !author || !year) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }
  
//     const newQuote = {
//       id,
//       quote,
//       author,
//       year
//     };
//   quotes.push(newQuote);
  
//   res.status(201).json(newQuote);
// });

router.post('/', (req, res) => {    
    const id = req.body.id;
    const quote = {
        id,
        quote: req.body.quote,
        author: req.body.author,
        year: req.body.year
    };
    req.context.models.quotes[id] = quote;
    
    return res.send(quote);

});
export default router;