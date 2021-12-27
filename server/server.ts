import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
const port = process.env.PORT || 3000;
import cors from 'cors';


const app = express();
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});


// if (process.env.NODE_ENV === 'production') {
//     app.get('/', (req, res) => {
//         return res.status(200).sendFile(path.resolve(__dirname, '../build/index.html'));
//         });
// };

app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});
  
  
//app.use('/', express.static(path.join(__dirname, '../src/index.html')))

app.use(express.json());
app.use(express.urlencoded({extended: true}));
  
export default app;
