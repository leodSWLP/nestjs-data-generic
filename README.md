<div align="center" style="text-align: center; margin: 20px 0;">
  <h1 style="margin: 0;">NESTJS-DATA-GENERIC</h1>
  <p style="margin: 5px 0;"><em>Streamline Your Data, Empower Your Applications</em></p>

  <img alt="last-commit" src="https://img.shields.io/github/last-commit/leodSWLP/dev-force-nestjs-data-generic?style=flat&logo=git&logoColor=white&color=0080ff" style="display: inline-block; margin: 2px 4px;">
  <img alt="repo-top-language" src="https://img.shields.io/github/languages/top/leodSWLP/dev-force-nestjs-data-generic?style=flat&color=0080ff" style="display: inline-block; margin: 2px 4px;">
  <img alt="repo-language-count" src="https://img.shields.io/github/languages/count/leodSWLP/dev-force-nestjs-data-generic?style=flat&color=0080ff" style="display: inline-block; margin: 2px 4px;">
  <br>
  <p style="margin: 10px 0;"><em>Built with the tools and technologies:</em></p>
  <img alt="JSON" src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" style="display: inline-block; margin: 2px 4px;">
  <img alt="Markdown" src="https://img.shields.io/badge/Markdown-000000.svg?style=flat&logo=Markdown&logoColor=white" style="display: inline-block; margin: 2px 4px;">
  <img alt="npm" src="https://img.shields.io/badge/npm-CB3837.svg?style=flat&logo=npm&logoColor=white" style="display: inline-block; margin: 2px 4px;">
  <img alt="Mongoose" src="https://img.shields.io/badge/Mongoose-F04D35.svg?style=flat&logo=Mongoose&logoColor=white" style="display: inline-block; margin: 2px 4px;">
  <img alt="Prettier" src="https://img.shields.io/badge/Prettier-F7B93E.svg?style=flat&logo=Prettier&logoColor=black" style="display: inline-block; margin: 2px 4px;">
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" style="display: inline-block; margin: 2px 4px;">
  <br>
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" style="display: inline-block; margin: 2px 4px;">
  <img alt="tsnode" src="https://img.shields.io/badge/tsnode-3178C6.svg?style=flat&logo=ts-node&logoColor=white" style="display: inline-block; margin: 2px 4px;">
  <img alt="GitHub%20Actions" src="https://img.shields.io/badge/GitHub%20Actions-2088FF.svg?style=flat&logo=GitHub-Actions&logoColor=white" style="display: inline-block; margin: 2px 4px;">
  <img alt="ESLint" src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" style="display: inline-block; margin: 2px 4px;">
  <img alt="Jest" src="https://img.shields.io/badge/Jest-C21325.svg?style=flat&logo=Jest&logoColor=white" style="display: inline-block; margin: 2px 4px;">
  <img alt="YAML" src="https://img.shields.io/badge/YAML-CB171E.svg?style=flat&logo=YAML&logoColor=white" style="display: inline-block; margin: 2px 4px;">
</div>
<br>
<hr style="margin: 20px 0;">
<br>

A robust and reusable NestJS common library designed to simplify data access across multiple data sources, including MongoDB (with transaction handling), Axios for HTTP requests, Kafka for messaging, and Redis for caching. This library provides an abstract class and utilities to eliminate boilerplate code, enforce industry-standard best practices, and streamline data access operations for enterprise-grade applications.

## Why nestjs-data-generic?

This project simplifies data operations while ensuring robust transaction handling and efficient caching mechanisms. The core features include:

<ul style="list-style-type: disc; padding-left: 16px; margin-top: 15px; margin-bottom: 15px;">
  <li style="margin-top: 10px; margin-bottom: 10px;">🚀 <strong>Abstract Class for Data Access:</strong> Reduces boilerplate code and promotes best practices for data operations.</li>
  <li style="margin-top: 10px; margin-bottom: 10px;">🔄 <strong>Transaction Management:</strong> Ensures data integrity and consistency during complex database interactions.</li>
  <li style="margin-top: 10px; margin-bottom: 10px;">🌐 <strong>Support for Multiple Data Sources:</strong> Seamlessly integrates with various data sources, providing flexibility in your applications.</li>
  <li style="margin-top: 10px; margin-bottom: 10px;">⚡ <strong>Efficient Build Process:</strong> Optimized TypeScript configuration reduces build times, boosting developer productivity.</li>
  <li style="margin-top: 10px; margin-bottom: 10px;">🛡️ <strong>Error Handling:</strong> Structured management of MongoDB-related exceptions enhances API reliability and user experience.</li>
</ul>

## Installation

This package is hosted on GitHub Packages. To install, you need to authenticate with GitHub and configure your `.npmrc`.

1. **Create a `.npmrc` file** in your project root:

   ```plaintext
   //npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
   @leodSWLP:registry=https://npm.pkg.github.com/
   ```

   - Replace `YOUR_GITHUB_TOKEN` with a GitHub Personal Access Token (PAT) with `read:packages` scope.

2. **Install the package**:
   ```bash
   npm install @leodSWLP/nestjs-data-generic
   ```

**Note**: If the package is scoped under `@dev-force` in the future (once permissions are resolved), replace `@leodSWLP` with `@dev-force`.

## Usage

Import and use the package in your NestJS application.

1. **Register the module** in your `app.module.ts`:

   ```typescript
   import { Module } from '@nestjs/common';
   import { DataGenericModule } from '@leodSWLP/nestjs-data-generic';

   @Module({
     imports: [DataGenericModule],
     controllers: [],
     providers: [],
   })
   export class AppModule {}
   ```

2. **Inject services** as needed:

   ```typescript
   import { Injectable } from '@nestjs/common';
   import { DataGenericService } from '@leodSWLP/nestjs-data-generic';

   @Injectable()
   export class MyService {
     constructor(private readonly dataService: DataGenericService) {}

     async someMethod() {
       const data = await this.dataService.getData();
       console.log(data);
     }
   }
   ```

**Note**: Update the import paths and service names based on your actual implementation.

## Configuration

The package uses a `config.yaml` file for configuration. Ensure the file is located in the `dist/src` directory after building.

1. **Create `src/config.yaml`**:

   ```yaml
   database:
     host: localhost
     port: 27017
     name: mydb
   ```

2. **Build the project**:

   - Run `npm run build` to copy `config.yaml` to `dist/src`.

3. **Access configuration** in your application:
   - The package loads `config.yaml` automatically. Ensure your implementation reads this file (e.g., using `yaml` or `fs`).

## Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository: `https://github.com/leodSWLP/dev-force-nestjs-data-generic`.
2. Create a feature branch: `git checkout
