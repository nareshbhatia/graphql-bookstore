// ----- Uncomment for default pubsub implementation -----
import { PubSub } from 'apollo-server';
export const pubsub = new PubSub();
// -------------------------------------------------------

// ------ Uncomment for Redis pubsub implementation ------
// import { RedisPubSub } from 'graphql-redis-subscriptions';
// export const pubsub = new RedisPubSub();
// -------------------------------------------------------
