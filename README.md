<div align="center" class="text-center">
<h1>NESTJS-DATA-GENERIC</h1>
<p><em>Streamline Your Data, Empower Your Applications</em></p>

<img alt="last-commit" src="https://img.shields.io/github/last-commit/leodSWLP/nestjs-data-generic?style=flat&amp;logo=git&amp;logoColor=white&amp;color=0080ff" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="repo-top-language" src="https://img.shields.io/github/languages/top/leodSWLP/nestjs-data-generic?style=flat&amp;color=0080ff" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="repo-language-count" src="https://img.shields.io/github/languages/count/leodSWLP/nestjs-data-generic?style=flat&amp;color=0080ff" class="inline-block mx-1" style="margin: 0px 2px;">
<p><em>Built with the tools and technologies:</em></p>
<img alt="JSON" src="https://img.shields.io/badge/JSON-000000.svg?style=flat&amp;logo=JSON&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="Markdown" src="https://img.shields.io/badge/Markdown-000000.svg?style=flat&amp;logo=Markdown&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="npm" src="https://img.shields.io/badge/npm-CB3837.svg?style=flat&amp;logo=npm&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="Mongoose" src="https://img.shields.io/badge/Mongoose-F04D35.svg?style=flat&amp;logo=Mongoose&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="Prettier" src="https://img.shields.io/badge/Prettier-F7B93E.svg?style=flat&amp;logo=Prettier&amp;logoColor=black" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&amp;logo=JavaScript&amp;logoColor=black" class="inline-block mx-1" style="margin: 0px 2px;">
<br>
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&amp;logo=TypeScript&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="tsnode" src="https://img.shields.io/badge/tsnode-3178C6.svg?style=flat&amp;logo=ts-node&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="GitHub%20Actions" src="https://img.shields.io/badge/GitHub%20Actions-2088FF.svg?style=flat&amp;logo=GitHub-Actions&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="ESLint" src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&amp;logo=ESLint&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="Jest" src="https://img.shields.io/badge/Jest-C21325.svg?style=flat&amp;logo=Jest&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="YAML" src="https://img.shields.io/badge/YAML-CB171E.svg?style=flat&amp;logo=YAML&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
</div>
<br>
<hr>

A robust and reusable NestJS common library designed to simplify data access across multiple data sources, including MongoDB (with transaction handling), Axios for HTTP requests, Kafka for messaging, and Redis for caching. This library provides an abstract class and utilities to eliminate boilerplate code, enforce industry-standard best practices, and streamline data access operations for enterprise-grade applications.

## Why nestjs-data-generic?

This project simplifies data operations while ensuring robust transaction handling and efficient caching mechanisms. The core features include:

<ul class="list-disc pl-4 my-0">
<li class="my-0">🚀 <strong>Abstract Class for Data Access:</strong> Reduces boilerplate code and promotes best practices for data operations.</li>
<li class="my-0">🔄 <strong>Transaction Management:</strong> Ensures data integrity and consistency during complex database interactions.</li>
<li class="my-0">🌐 <strong>Support for Multiple Data Sources:</strong> Seamlessly integrates with various data sources, providing flexibility in your applications.</li>
<li class="my-0">⚡ <strong>Efficient Build Process:</strong> Optimized TypeScript configuration reduces build times, boosting developer productivity.</li>
<li class="my-0">🛡️ <strong>Error Handling:</strong> Structured management of MongoDB-related exceptions enhances API reliability and user experience.</li>
</ul>

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
