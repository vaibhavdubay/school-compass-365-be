import { join } from 'path';
import { cwd } from 'process';
import { renderFile } from 'pug';
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
    const { template, to, subject, data } = metaData;
    const pathAddress = join(cwd(), 'templates', template);
    const html = renderFile(pathAddress, { screen: '', ...data });
    const emailOptions = {
      to,
      subject,
      html,
    };
    await this.mailer.save({
      body: html,
      to,
      subject,
      template,
    });
    return this.mailerService.sendMail(emailOptions);
  }
}
