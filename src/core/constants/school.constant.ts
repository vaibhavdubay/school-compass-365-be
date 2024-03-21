import { ACADEMIC_STATUS } from '@sc-enums/academicStatus';
import mongoose from 'mongoose';

type PipeLineStage = mongoose.PipelineStage;
type AnyExpression = mongoose.AnyExpression;

export const completeSchoolInformationProjection = {
  $project: {
    _id: 1,
    name: 1,
    establishedYear: 1,
    address1: 1,
    address2: 1,
    city: 1,
    state: 1,
    pincode: 1,
    schoolDISECode: 1,
    schoolCode: 1,
    createdAt: 1,
    updatedAt: 1,
    classes: {
      $size: '$classes',
    },
    students: {
      $size: '$students',
    },
    teachers: {
      $size: '$teachers',
    },
  },
};

export const matchStudentStage = (
  schoolId: mongoose.Types.ObjectId | string,
): PipeLineStage => ({
  $match: {
    schoolId: new mongoose.Types.ObjectId(schoolId),
    academicStatus: ACADEMIC_STATUS.ACTIVE,
  },
});

export const lookupClass = (localField: string, as: string): PipeLineStage => ({
  $lookup: {
    as,
    localField,
    from: 'classes',
    foreignField: '_id',
  },
});

export const checkCondition = (then: AnyExpression, or: AnyExpression) => ({
  $cond: {
    if: {
      $or: [
        { $eq: [{ $size: '$nextClass' }, 0] }, // Check if nextClass is empty array
        {
          $not: {
            $in: [
              { $arrayElemAt: ['$class._id', 0] },
              '$school-profiles.classes',
            ],
          },
        }, // Check if class._id is in school.classes array
      ],
    },
    then,
    else: or,
  },
});

export const setStudentFieldsStage: PipeLineStage = {
  $set: {
    class: checkCondition(
      { $arrayElemAt: ['$class._id', 0] },
      { $arrayElemAt: ['$nextClass._id', 0] },
    ),
    academicStatus: checkCondition(
      ACADEMIC_STATUS.GRADUATED,
      ACADEMIC_STATUS.ACTIVE,
    ),
  },
};

export const updateAcademicYear = (
  academicYears: mongoose.Types.ObjectId | string,
): PipeLineStage => ({
  $set: {
    academicYears: checkCondition(
      { $concatArrays: ['$academicYears', [academicYears]] },
      '$academicYears',
    ),
  },
});
export const nextClassProjection = {
  $project: {
    nextClass: 0,
    'school-profiles': 0,
  },
};

export const mergeStudentsStage: PipeLineStage = {
  $merge: {
    into: 'students',
    on: '_id',
    whenMatched: 'merge',
  },
};
