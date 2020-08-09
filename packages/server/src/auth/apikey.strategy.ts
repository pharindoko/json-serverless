import passport from 'passport';
import * as headerapikey from 'passport-headerapikey';
import { AuthStrategy } from './auth.strategy';
import express from 'express';

export class ApiKeyStrategy implements AuthStrategy {
  allowUrl = [
    '/',
    '/ui',
    '/graphql',
    '/graphql?',
    '/swagger-ui.css',
    '/swagger-ui-bundle.js',
    '/swagger-ui-bundle.js.map',
    '/swagger-ui-standalone-preset.js.map',
    '/swagger-ui-standalone-preset.js',
    '/swagger-ui-init.js',
    '/favicon-16x16.png',
    '/favicon.ico',
    '/api-spec',
  ];
  server: express.Express;
  apiKey: string;
  authenticationMiddleware = null;
  constructor(server: express.Express, apiKey: string) {
    this.server = server;
    this.apiKey = apiKey;
    this.authenticationMiddleware = (whiteList: string[]) => async (
      req,
      res,
      next
    ) => {
      if (whiteList.includes(req.url)) {
        return next();
      }
      try {
        await passport.authenticate(
          'headerapikey',
          {
            session: false,
          },
          (err, user, info) => {
            if (err) {
              return res.status(401).send(err.message);
            }
            if (!user) {
              return res.status(401).send(info.message);
            }
            return next();
          }
        )(req, res, next);
      } catch (error) {
        return res.status(401).send('Unauthorized');
      }
    };
  }

  init(): void {
    this.server.use(passport.initialize());
    const self = this;
    passport.use(
      new headerapikey.HeaderAPIKeyStrategy(
        { header: 'Authorization', prefix: '' },
        false,
        (apikey, done) => {
          if (apikey !== self.apiKey) {
            return done(new Error('invalid key'));
          }
          return done(null, {});
        }
      )
    );
    this.server.use(this.authenticationMiddleware(this.allowUrl));
  }
}
