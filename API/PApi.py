import mysql.connector
import json
from mysql.connector import Error
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)
#@app.route('/<email>')
@app.route('/')
#def search(email):
def search():
    try:
        connection = mysql.connector.connect(host='localhost',
                                         database='store',
                                         user='root',
                                         password='1234')

        cursor = connection.cursor(buffered=True)
        #sql_select_query = """select * from user where email = %s"""
        sql_select_query = """select * from user"""
        #cursor.execute(sql_select_query, (email,))
        cursor.execute(sql_select_query)
        record = cursor.fetchall()
        data_list = {}
        data_list['users'] = []
        for row in record:
            data={'userID':row[0],'userName':row[1],'password':row[2],'userType':row[3],'status':row[4],'email':row[5]}
            data_list['users'].append(data)

        with open("data_file.json", "w") as write_file:
            json.dump(data_list, write_file, indent=1)

    except mysql.connector.Error as error:
        print("Failed to get record from MySQL table: {}".format(error))

    finally:
        if (connection.is_connected()):
            cursor.close()
            connection.close()
            print("MySQL connection is closed")

#email = "1163@hotmail.com"
#search(email)
search()


