import functools

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash

from flaskr.database.db import get_db

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/register', methods=('GET', 'POST'))
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']
        print('registro:', email, username, password)

        error = None

        if not username:
            error = 'Username is required.'
        elif not password:
            error = 'Password is required.'

        if error is None:
            query = "INSERT INTO user (username, email, password) VALUES (?, ?, ?)"
            params = (username, email, generate_password_hash(password))
            db_handler(query, params)
        else:
            flash(error)

        return redirect(url_for("auth.login"))

    return render_template('auth/register.html')

@bp.route('/login', methods=('GET', 'POST'))
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        print('login:', username, password)

        error = None
        query = 'SELECT * FROM User WHERE username = ?'

        user = db_handler(query, [username])

        if user is None:
            error = 'Incorrect username.'
        elif not check_password_hash(user['password'], password):
            error = 'Incorrect password.'

        else:
            session.clear()
            session['user_id'] = user['id']
            session['user_device'] = {
                # registrar y obtener dispositivo de administracion en la bd
                # placeholder
                'info':'192.168.70.1',
                'conn': None
            }
            return redirect(url_for('index'))
        
        flash(error)


    return render_template('auth/login.html')

@bp.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('auth.login'))

@bp.before_app_request
def load_logged_in_user():
    print('before:', session.get('user_id'))
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        g.user = get_db().execute(
            'SELECT * FROM user WHERE id = ?', (user_id,)
        ).fetchone()

def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for('auth.login'))

        return view(**kwargs)

    return wrapped_view

def db_handler(query, params):
    db = get_db()
    try:
        r = db.execute(query, params).fetchone()
        db.commit()
        return r
    except db.IntegrityError:
        r = f"Error {db.IntegrityError}"
        return None
