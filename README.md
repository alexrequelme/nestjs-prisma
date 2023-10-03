<h1 align="center"></h1>

<div align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://camo.githubusercontent.com/5f54c0817521724a2deae8dedf0c280a589fd0aa9bffd7f19fa6254bb52e996a/68747470733a2f2f6e6573746a732e636f6d2f696d672f6c6f676f2d736d616c6c2e737667" width="120" alt="Nest Logo" />
  </a>
</div>

<h3 align="center">NestJS Prisma Module</h3>

<div align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/built%20with-NestJs-red.svg" alt="Built with NestJS">
  </a>
</div>

### Installation

```bash
pnpm add @prisma/client
pnpm add https://github.com/alexrequelme/nestjs-prisma.git
```

Once the installation process is complete, we can import the `PrismaModule` into the root `AppModule`.

```ts
import { Module } from '@nestjs-common';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [PrismaModule.forRoot()],
})
export class AppModule {}
```

Once this is done, the `PrismaService` will be available to inject across the entire project (without needing to import any modules), for example:

```ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
}
```

## Author

Alexander Requelme

## License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
