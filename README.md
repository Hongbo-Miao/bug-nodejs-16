# Node.js 16 Bug

## Reproduce

Run

```shell
nvm use 16.2.0
npm install
npm run dev
```

The server will first run successfully. However, if you hit any endpoint such as openning http://localhost:5000, you will see error:

```shell
Error: async hook stack has become corrupted (actual: 73, expected: 0)
 1: 0x10a031d5b node::AsyncHooks::pop_async_context(double) [/Users/homiao/.nvm/versions/node/v16.2.0/bin/node]
 2: 0x10a031b0c node::InternalCallbackScope::Close() [/Users/homiao/.nvm/versions/node/v16.2.0/bin/node]
 3: 0x10a0315de node::InternalCallbackScope::~InternalCallbackScope() [/Users/homiao/.nvm/versions/node/v16.2.0/bin/node]
 4: 0x10a0a2b88 node::Environment::RunTimers(uv_timer_s*) [/Users/homiao/.nvm/versions/node/v16.2.0/bin/node]
 5: 0x10aaf6877 uv__run_timers [/Users/homiao/.nvm/versions/node/v16.2.0/bin/node]
 6: 0x10aafb0ad uv_run [/Users/homiao/.nvm/versions/node/v16.2.0/bin/node]
 7: 0x10a032ea4 node::SpinEventLoop(node::Environment*) [/Users/homiao/.nvm/versions/node/v16.2.0/bin/node]
 8: 0x10a143414 node::NodeMainInstance::Run(node::EnvSerializeInfo const*) [/Users/homiao/.nvm/versions/node/v16.2.0/bin/node]
 9: 0x10a0cf97d node::Start(int, char**) [/Users/homiao/.nvm/versions/node/v16.2.0/bin/node]
10: 0x7fff2057a621 start [/usr/lib/system/libdyld.dylib]
11: 0x5
```

## My Findings

1. I found if removing OpenTelemetry by commenting out
https://github.com/Hongbo-Miao/bug-nodejs-16/blob/main/src/index.ts#L2
The server won't have any issue.

2. Or commenting out Sentry
https://github.com/Hongbo-Miao/bug-nodejs-16/blob/main/src/app.ts#L7
The server won't have any issue neither.

So I am guessing some code in OpenTelemetry affects Sentry.

This issue only happens in Node.js 16, no issue in Node.js 14 or 15.
