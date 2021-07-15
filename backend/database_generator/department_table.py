from pymongo import MongoClient
from csv import reader


client = MongoClient("mongodb://localhost:27017/")

# database name
mydb = client["ku_post_it_db"]

# table name
mycollection = mydb["department_table"]


# read data from csv file
with open("department_code.csv",  encoding="utf8") as read_obj:
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
x = mycollection.insert_many(insert_list)

#print list of the _id values of the inserted documents:
print(x.inserted_ids)
