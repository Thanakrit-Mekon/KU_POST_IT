import * as mongoose from 'mongoose'

export const DepartmentSchema = new mongoose.Schema({
    faculty_code: { type: String, required: true},
    department_name: { type: String, required: true},
    department_code: { type: String, required: true},
});

export interface Department extends mongoose.Document {
    id: string;
    faculty_code: string;
    department_name: string;
    department_code: string;
}