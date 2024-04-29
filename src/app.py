<<<<<<< HEAD
from flask import Flask, render_template
from flask_migrate import Migrate
=======
from flask import Flask, render_template, session, jsonify
>>>>>>> development
from models import db
from config import DevelopmentConfig
import json

# from flask_migrate import Migrate

from models import Post, Notification, User, db, Reply

import random

# Import Blueprints
from blueprints.auth import auth
from blueprints.post import post


def create_app(config_class=DevelopmentConfig):
    app = Flask(__name__)
    app.config.from_object(config_class)
    migrate = Migrate(app, db)

    db.init_app(app)
<<<<<<< HEAD
    migrate.init_app(app, db)
=======
    # migrate = Migrate(app, db)
    # migrate = Migrate(app, db)  # Initialize Flask-Migrate
>>>>>>> development

    # Register Blueprints with their URL prefixes
    app.register_blueprint(auth, url_prefix="/auth")
    app.register_blueprint(post, url_prefix="/post")

    @app.route("/profile/<int:user_id>")
    def user_profile(user_id):
        user = User.query.get_or_404(user_id)
        socials = json.loads(user.socials) if user.socials else {}
        return jsonify(
            {
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "phone_number": user.phone_number,
                "socials": socials,
            }
        )

    @app.route("/")
    def home():

        notification_count = 0

        if "user_id" in session:
            user_id = session["user_id"]
            notification_count = Notification.query.filter_by(
                recipient_id=user_id
            ).count()

        return render_template("landing.html", notification_count=notification_count)

    return app


if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        db.create_all()
        app.run(debug=True)
