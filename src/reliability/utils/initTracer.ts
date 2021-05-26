import { CollectorTraceExporter } from '@opentelemetry/exporter-collector';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { DnsInstrumentation } from '@opentelemetry/instrumentation-dns';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { GraphQLInstrumentation } from '@opentelemetry/instrumentation-graphql';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { IORedisInstrumentation } from '@opentelemetry/instrumentation-ioredis';
import { NodeTracerProvider } from '@opentelemetry/node';
import { BatchSpanProcessor, ConsoleSpanExporter } from '@opentelemetry/tracing';
import isDevelopment from '../../shared/utils/isDevelopment';

const initTracer = (): void => {
  const serviceName = 'hm-api-trace-service';
  const tracerProvider = new NodeTracerProvider();

  registerInstrumentations({
    instrumentations: [
      new DnsInstrumentation(),
      new ExpressInstrumentation(),
      new GraphQLInstrumentation(),
      new HttpInstrumentation(),
      new IORedisInstrumentation(),
    ],
    tracerProvider,
  });

  if (isDevelopment()) {
    tracerProvider.addSpanProcessor(new BatchSpanProcessor(new ConsoleSpanExporter()));
    tracerProvider.addSpanProcessor(
      new BatchSpanProcessor(
        new CollectorTraceExporter({
          serviceName,
        }),
      ),
    );
  }

  tracerProvider.register();
};

initTracer();
