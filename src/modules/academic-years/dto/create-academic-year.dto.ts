export class CreateAcademicYearDto {
  academicYear: string = `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`;
}
