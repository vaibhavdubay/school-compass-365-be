import { Injectable } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common/interfaces';
import { Role } from '@sc-enums/role';
import { UserService } from '@sc-modules/user/user.service';

@Injectable()
export class AppInitializer implements OnModuleInit {
  constructor(private readonly userService: UserService) {}

  async onModuleInit() {
    const superAdminExists = await this.userService.exists({
      role: Role.SUPERADMIN,
    });
    if (!superAdminExists) {
      await this.userService.create({
        userName: 'superadmin',
        firstName: 'Super',
        lastName: 'Admin',
        email: 'superadmin@sc-365.com',
        password: 'SuperAdmin@1',
        role: Role.SUPERADMIN,
      });
      console.log('Super admin user created successfully');
    }
  }
}
