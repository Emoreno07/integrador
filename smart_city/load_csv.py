import csv
import sqlite3
connection = sqlite3.connect('db.sqlite3')
cursor = connection.cursor()
with open('sensor_data.csv', encoding='utf-8') as data_csv:
    query = '''INSERT INTO `app_smart_sensor`
    (tipo,unidade_medida,latitude,longitude,localizacao,responsavel,status_operacional,observacao,mac_address)
    VALUES (?,?,?,?,?,?,?,?,?);'''
    csv_reader = csv.reader(data_csv, delimiter=',', quotechar='|' )
    for row in csv_reader:
        a = cursor.execute(query,row)
        connection.commit()
    print('feito')
    cursor.close()

