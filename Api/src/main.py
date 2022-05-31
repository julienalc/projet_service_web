from flask import Flask, request, jsonify, Response, render_template
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://root:root@localhost:5432/contact"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

@app.route("/contact", methods = ["POST", "GET"])
def contact():
    if request.method == "GET":
        result = Contact.query.all()
        contacts = []
        for row in result:
            contact = {
                "id" : row.id,
                "firstname" : row.firstname,
                "lastname" : row.lastname,
                "number": row.number,
                "email" : row.email,
                "adress" : row.adress,
                "birthday":row.birthday,
                "picture":row.picture
            }
            contacts.append(contact)
        return jsonify(contacts)

    if request.method == "POST":
        data = request.json
        new_contact = Contact(
            data["firstname"],
            data["lastname"],
            data["number"],
            data["email"],
            data["adress"],
            data["birthday"],
            data["picture"]
        )
        db.session.add(new_contact)
        db.session.commit()
        return Response(status=200)

@app.route("/contact/<id>", methods=["GET"])
def contact_by_id(id):
    result = Contact.query.filter_by(id=id).first_or_404()
    contacts = []
    contact = {
        "id": result.id,
        "firstname": result.firstname,
        "lastname": result.lastname,
        "number": result.number,
        "email": result.email,
        "adress": result.adress,
        "birthday": result.birthday,
        "picture": result.picture
    }
    contacts.append(contact)
    return (jsonify(contacts))


class Contact(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    firstname = db.Column(db.String(100))
    lastname = db.Column(db.String(100))
    number = db.Column(db.String(100))
    email = db.Column(db.String(100))
    adress = db.Column(db.String(100))
    birthday = db.Column(db.String(100))
    picture = db.Column(db.String(500))


    def __init__(self, id, firstname, lastname, number, email, adress, birthday, picture):
        self.id = id
        self.firstname = firstname
        self.lastname = lastname
        self.number = number
        self.email = email
        self.adress = adress
        self.birthday = birthday
        self.picture = picture


from faker import Faker
fake = Faker()

def populate():
    for n in range(1, 100):
        id = n
        firstname = fake.first_name()
        lastname = fake.last_name()
        number = fake.phone_number()
        email = fake.email()
        adress = fake.address()
        birthday = fake.date()
        picture = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Google_Contacts_icon.svg/langfr-1024px-Google_Contacts_icon.svg.png"

        new_contact = Contact(id, firstname, lastname, number, email, adress, birthday, picture)
        db.session.add(new_contact)
    db.session.commit()


if __name__ == '__main__':
    db.drop_all()
    db.create_all()
    populate()
    app.run(host="0.0.0.0", port=8080, debug=True)