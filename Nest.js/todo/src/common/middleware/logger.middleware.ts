import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction, RequestHandler } from 'express';

export const logger: RequestHandler = (req) => {
  console.log('logger');
};
