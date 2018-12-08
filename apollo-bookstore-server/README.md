Apollo Bookstore Server
=======================
Apollo based bookstore server.

Dev Build
---------
```bash
$ yarn
$ yarn dev
```

Now point your browser to http://localhost:4000/. You will see GraphQL Playground, an interactive development environment to test the GraphQL API.

Scaling Subscriptions Using Redis
---------------------------------
By default, we use the standard `PubSub` implementation from [graphql-subscriptions](https://github.com/apollographql/graphql-subscriptions). This implementation does not scale well as described in the docs:

> Note that the default PubSub implementation is intended for demo purposes. It only works if you have a single instance of your server and doesn't scale beyond a couple of connections. For production usage you'll want to use one of the PubSub implementations backed by an external store. (e.g. Redis)

We can use [graphql-redis-subscriptions](https://github.com/davidyaha/graphql-redis-subscriptions) for a more scalable implementation of `PubSub`. To do this, follow the steps below:

1. Install and start a Redis server. Here's [an article](https://1upnote.me/post/2018/06/install-config-redis-on-mac-homebrew/) that describes how to install Redis on MacOS.
2. Open `src/graphql/pubsub.ts`. Comment out the default pubsub implementation (lines 2-3). Uncomment the Redis implementation (lines 7-8).
3. Restart the server.

Now Subscriptions will use the Redis server for publish/subscribe.  
