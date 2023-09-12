import * as express from 'express';
import { Application } from 'express';
import { Request, Response } from 'express';

const SUBSCRIPTIONS: any[] = [];

const bodyParser = require('body-parser');

const webpush = require('web-push');

const PORT = 3001;
const vapidKeys = {
  publicKey:
    'BO4Jby-cjY3if0B4THZgHTQG1FKTgzuASQANrrBFWyoSPxrsiwD7OXKQ2LW35IXyfxEeX-7YzbE0Tszl4bgdRp8',
  privateKey: 'MbI-Vvv7MGc6DMCLYPAdIXX7yYi__cmyVlvBH2MO_Rg',
};

webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const app: Application = express();

app.use(bodyParser.json());

app.route('/api/subscription').post((req: Request, res: Response) => {
  const sub = req.body;
  try {
    SUBSCRIPTIONS.push(sub);
    console.log('Total subscriptions', SUBSCRIPTIONS.length);
  } catch (error) {
    console.log('SUBSCRIPTIONS', error);
  }

  res.status(200).json({ message: 'Subscription added successfully.' });
});

app.route('/api/notification').post((req: Request, res: Response) => {
  const data = req.body;

  Promise.all(
    SUBSCRIPTIONS.map((sub) =>
      webpush.sendNotification(sub, JSON.stringify(data))
    )
  )
    .then(() =>
      res.status(200).json({ message: 'Newsletter sent successfuly' })
    )
    .catch((err) => {
      console.error('Error sending notification fail, reason:', err);
      res.sendStatus(500);
    });
});

app.listen(PORT, () =>
  console.log('Server running at http://localhost:' + PORT)
);
