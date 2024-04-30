import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Notify } from './entities/notify.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { MailOptions } from 'src/core/models/core.model';
import { BaseRepository } from '@sc-helpers/repository.helper';
import { InjectRepository } from '@nestjs/typeorm';
import { Mailer } from './entities/mailer.entity';

@Injectable()
export class NotifyService extends BaseRepository<Notify> {
  constructor(
    readonly dataSource: DataSource,
    private readonly mailerService: MailerService,
    @InjectRepository(Mailer) private readonly mailer: Repository<Mailer>,
  ) {
    super(Notify, dataSource.createEntityManager());
  }

  async prepareEmail(metaData: MailOptions) {
    const { data, ...mailOptions } = metaData;
    await this.mailer.save({
      body: JSON.stringify(data || {}),
      ...mailOptions,
    });
    return this.mailerService.sendMail({
      ...mailOptions,
      context: data,
    });
  }
}
