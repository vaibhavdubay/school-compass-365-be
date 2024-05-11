import { ACADEMIC_STATUS } from '@sc-enums/academicStatus';
import { DB_Model, Supporter_Model } from '@sc-enums/model';

export const completeAcademicYear = (
  schoolId: string,
  newAcademicYearId: string,
): string => `
UPDATE ${DB_Model.STUDENT} AS student
JOIN ${DB_Model.CLASS} AS class ON student.classId = class.id
SET
  student.classId = IF(class.nextClassId IS NOT NULL, class.nextClassId, student.classId),
  student.academicStatus = IF(class.nextClassId IS NULL, '${ACADEMIC_STATUS.GRADUATED}', student.academicStatus)
WHERE student.schoolId = '${schoolId}'
AND student.academicStatus = '${ACADEMIC_STATUS.ACTIVE}';

INSERT INTO ${Supporter_Model.STUDENTS_ACADEMICS} (student_id, academic_id)
SELECT student.id, '${newAcademicYearId}'
FROM ${DB_Model.STUDENT} AS student
WHERE student.schoolId = '${schoolId}'
AND student.academicStatus = '${ACADEMIC_STATUS.ACTIVE}';

INSERT INTO ${Supporter_Model.TEACHER_ACADEMICS} (teacher_id, academic_id)
SELECT teacher.id, '${newAcademicYearId}'
FROM ${DB_Model.TEACHER} AS teacher
WHERE teacher.schoolId = '${schoolId}';

INSERT INTO ${Supporter_Model.SCHOOL_ACADEMIC} (school_id, academic_id)
VALUES ('${schoolId}', '${newAcademicYearId}');
`;
