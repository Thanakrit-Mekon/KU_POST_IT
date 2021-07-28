import * as mongoose from 'mongoose'

export const NisitSchema = new mongoose.Schema({
    profile_url: { type: String, required: true},
    first_name: { type: String, required: true},
    last_name: { type: String, required: true},
    gmail: { type: String, required: true},
    password: { type: String, required: true},
    phone: { type: String, required: true},
    student_id: { type: String, required: true},
    year: { type: String, required: true},
    faculty_code: { type: String, required: true},
    department_code: { type: String, required: true},
    get_notify: { type: Boolean, required: true},
});

export interface Nisit extends mongoose.Document {
    id: string;
    profile_url: string; 
    first_name: string;
    last_name: string;
    gmail: string;
    password: string;
    phone: string;
    student_id: string;
    year: string;
    faculty_code: string; 
    department_code: string; 
    get_notify: boolean;
}