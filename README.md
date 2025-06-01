# nestjs-data-generic

A robust and reusable NestJS common library designed to simplify data access across multiple data sources, including MongoDB (with transaction handling), Axios for HTTP requests, Kafka for messaging, and Redis for caching. This library provides an abstract class and utilities to eliminate boilerplate code, enforce industry-standard best practices, and streamline data access operations for enterprise-grade applications.

## Installation

```bash
npm run build && npm pack
```

## TODO List

- [x] MongoDB Integration
  - Abstract class for MongoDB data access
  - Transaction handling support
  - CRUD operations with Mongoose
- [ ] Axios HTTP Client
  - Implement HTTP service for external API calls
  - Add retry mechanism and error handling
  - Support for configurable request options
- [ ] Kafka Integration
  - Implement producer and consumer services
  - Add support for topic management
  - Ensure fault-tolerant message processing
- [ ] Redis Integration
  - Implement caching service with Redis
  - Support for key-value operations
  - Add connection pooling and error handling
