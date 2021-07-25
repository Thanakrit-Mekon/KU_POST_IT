from pymongo import MongoClient
from csv import reader


####################### config database ###########################
client = MongoClient("mongodb://localhost:27017/")
mydb = client["ku_post_it"]


###################### config collection ##########################
department_collection = mydb["Department"]
faculty_collection = mydb["Faculty"]


######################### insert faculty ##########################
# read data from csv file
def insert_faculty():
    with open("faculty_code.csv",  encoding="utf8") as read_obj:
        csv_reader = reader(read_obj)
        list_of_rows = list(csv_reader)
    # create insert_list
    insert_list = []  
    for row in list_of_rows:
        insert_list.append({
                            "faculty_code":row[0],
                            "faculty_name":row[2]
                            })
    # insert to mongodb
    x = faculty_collection.insert_many(insert_list)
    #print list of the _id values of the inserted documents:
    print(x.inserted_ids)
###################################################################


###################### insert department ##########################
def insert_department():
    # read data from csv file
    with open("department_eng_ver.csv",  encoding="utf8") as read_obj:
        csv_reader = reader(read_obj)
        list_of_rows = list(csv_reader)
    # create insert_list
    insert_list = []  
    for row in list_of_rows:
        insert_list.append({
                            "department_name":row[1],
                            "faculty_code":row[0],
                            "department_code":row[2]
                            })
    # insert to mongodb
    x = department_collection.insert_many(insert_list)
    #print list of the _id values of the inserted documents:
    print(x.inserted_ids)
###################################################################


######################### main begins here ########################
insert_faculty()
insert_department()
###################################################################
