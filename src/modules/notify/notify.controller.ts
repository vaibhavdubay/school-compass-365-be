import { Controller, Get, Param, Delete } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { NOTIFICATION_STATUS } from '@sc-enums/notificationStatus';
import { UserProfile } from '@sc-decorators/user-profile';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '@sc-decorators/auth';

@Controller('notification')
@Auth('all')
@ApiTags('Notifications')
export class NotifyController {
  constructor(private readonly notifyService: NotifyService) {}

  @Get()
  async findAll(@UserProfile() userProfile: UserProfile) {
    await this.notifyService.update(
      { user: userProfile },
      {
        status: NOTIFICATION_STATUS.SENT,
      },
    );
    return this.notifyService.find({ where: { user: userProfile } });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notifyService.findById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notifyService.softDelete({ id });
  }
}
