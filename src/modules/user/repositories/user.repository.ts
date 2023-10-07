import { UserEntity } from '../entities/user.entity';
import { UpdateResult, DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/core/base/repository/base.repository';
import { IUserRepository } from '../interfaces/user.repository.interface';
import { PaginationListDto } from 'src/core/pagination/dtos/pagination.list.dto';

@Injectable()
export class UserRepository
    extends BaseRepository<UserEntity>
    implements IUserRepository
{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>
    ) {
        super();
    }

    async findAllAndCount(
        find: Record<string, any>,
        pagination: PaginationListDto,
        options?: Record<string, any>
    ) {
        const { _limit, _offset, _order } = pagination;
        return await this.userRepo.findAndCount({
            where: find,
            take: _limit,
            skip: _offset,
            order: _order,
            select: options.select,
        });
    }

    async findOneByUsername(username: string): Promise<UserEntity> {
        return await this.userRepo.findOneBy({ username });
    }

    async findOneById(id: string): Promise<UserEntity> {
        return await this.userRepo.findOneBy({ id });
    }

    async create(userEntity: UserEntity) {
        return await this.userRepo.save(userEntity);
    }

    async update(
        id: string,
        userEntity: Partial<UserEntity>
    ): Promise<UpdateResult> {
        return await this.userRepo.update(id, userEntity);
    }

    async delete(id: string): Promise<DeleteResult> {
        return await this.userRepo.delete(id);
    }

    async truncate(): Promise<void> {
        await this.userRepo.delete({});
    }

    async createMany(users: UserEntity[]): Promise<void> {
        await this.userRepo.save(users);
    }
}
