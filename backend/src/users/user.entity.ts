import * as mongoose from 'mongoose'

export const UserloginSchema = new mongoose.Schema({
    username: { type: String, required: true},
    password: { type: String, required: true},
    user_type: { type: String, required: true},
});

export interface Userlogin extends mongoose.Document {
    id: string;
    username: string;
    password: string;
    user_type: string;
}