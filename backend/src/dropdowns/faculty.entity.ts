import * as mongoose from 'mongoose'

export const FacultySchema = new mongoose.Schema({
    faculty_code: { type: String, required: true},
    faculty_name: { type: String, required: true},
});

export interface Faculty extends mongoose.Document {
    id: string;
    faculty_code: string;
    faculty_name: string;
}