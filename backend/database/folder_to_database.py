#!/usr/bin/env python3

import os
import sys
import mariadb
import base64


def file_to_database(filepath, db):
    cursor = db.cursor()
    filename = os.path.basename(filepath)
    with open(filepath, 'rb') as f:
        content = f.read()
    content_base64 = base64.b64encode(content)
    query = "INSERT INTO File (filename, data) VALUES ( %s, %s )"
    cursor.execute(query, (filename, content_base64))


def files_in_folder(directory, db):
    for filename in os.listdir(directory):
        f = os.path.join(directory, filename)
        if os.path.isfile(f):
            file_to_database(f, db)
        elif os.path.isdir(f):
            files_in_folder(f, db)
        else:
            continue
    db.commit()


def main():
    if len(sys.argv) < 2:
        print("Il faut donner un dossier !")
        exit(1)
    db = mariadb.connect(user="alive",
                         password="5e6c&6iP&m6p6aQd$A&f",
                         host="localhost",
                         database="alive")
    files_in_folder(sys.argv[1], db)
    db.commit()
    db.close()


if __name__ == "__main__":
    main()
