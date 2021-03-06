import { scaleUp } from './scale-runners/scale-up';
import { scaleDown } from './scale-runners/scale-down';
import { SQSEvent } from 'aws-lambda';

module.exports.scaleUp = async (event: SQSEvent, context: any, callback: any) => {
  console.log(event);
  try {
    for (const e of event.Records) {
      await scaleUp(e.eventSource, JSON.parse(e.body));
    }
    return callback(null);
  } catch (e) {
    console.error(e);
    return callback('Failed handling SQS event');
  }
};

module.exports.scaleDown = async (event: any, context: any, callback: any) => {
  try {
    scaleDown();
    return callback(null);
  } catch (e) {
    console.error(e);
    return callback('Failed');
  }
};
