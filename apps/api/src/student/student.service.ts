import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudentService {
  constructor(private readonly prismaService: PrismaService) {}

  // Create a new student
  async create(createStudentDto: CreateStudentDto) {
    try {
      return await this.prismaService.student.create({
        data: createStudentDto,
      });
    } catch (error) {
      throw new Error('Error while creating the student');
    }
  }

  // Get all students
  async findAll() {
    return await this.prismaService.student.findMany();
  }

  // Get a single student by ID
  async findOne(id: number) {
    const student = await this.prismaService.student.findUnique({
      where: { id },
    });

    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    return student;
  }

  // Update a student by ID
  async update(id: number, updateStudentDto: UpdateStudentDto) {
    await this.findOne(id); // Check if student exists

    return await this.prismaService.student.update({
      where: { id },
      data: updateStudentDto,
    });
  }

  // Delete a student by ID
  async remove(id: number) {
    await this.findOne(id); // Check if student exists

    return await this.prismaService.student.delete({
      where: { id },
    });
  }
}
