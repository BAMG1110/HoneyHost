from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for
)
from werkzeug.exceptions import abort

from flaskr.auth import login_required
from flaskr.database.db import get_db

bp = Blueprint('network', __name__)

@bp.route('/')
@login_required
def index():
    db = get_db()
    users = db.execute(
        'SELECT * '
        'FROM user'
    ).fetchall()
    return render_template('network/index.html', users=users)

@bp.route('/create', methods=('GET', 'POST'))
@login_required
def create():

    deviceList = get_devices()
    for row in deviceList:
        print(row['hostname'])

    if request.method == 'POST':
        print(request.form)

        try:
            db = get_db()
            db.execute(
                """
                    INSERT INTO Device (
                        hostname,
                        branch_id,
                        ip,
                        device_type,
                        operating_system,
                        username,
                        password,
                        secret
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    request.form['hostname'],
                    request.form['branch_id'],
                    request.form['ip'],
                    request.form['device_type'],
                    request.form['operating_system'],
                    request.form['username'],
                    request.form['password'],
                    request.form['secret'],
                )
            )
            db.commit()
        except db.IntegrityError:
            print(f"error al registrar un dispositivo nuevo: {db.IntegrityError}")
            return redirect(url_for('create'))

    return render_template('network/create.html', deviceList = deviceList)

@bp.route('/<int:id>/update', methods=('GET', 'POST'))
@login_required
def update(id):
    post = get_post(id)

    if request.method == 'POST':
        title = request.form['title']
        body = request.form['body']
        error = None

        if not title:
            error = 'Title is required.'

        if error is not None:
            flash(error)
        else:
            db = get_db()
            db.execute(
                'UPDATE post SET title = ?, body = ?'
                ' WHERE id = ?',
                (title, body, id)
            ).fetchall()
            db.commit()
            return redirect(url_for('network.index'))

    return render_template('network/update.html', post=post)

@bp.route('/<int:id>/delete', methods=('POST',))
@login_required
def delete(id):
    get_post(id)
    db = get_db()
    db.execute('DELETE FROM post WHERE id = ?', (id,))
    db.commit()
    return redirect(url_for('network.index'))

def get_devices():
    deviceList = []

    try:
        db = get_db()
        deviceList = get_db().execute(
            """
                SELECT *
                FROM Device
            """
        ).fetchall()
    except db.IntegrityError:
        print('error al obtener la lista de dispositivos')

    print('dispositivos', deviceList)
    return deviceList

def get_post(id, check_author=True):
    post = get_db().execute(
        'SELECT p.id, title, body, created, author_id, username'
        ' FROM post p JOIN user u ON p.author_id = u.id'
        ' WHERE p.id = ?',
        (id,)
    ).fetchone()

    if post is None:
        abort(404, f"Post id {id} doesn't exist.")

    if check_author and post['author_id'] != g.user['id']:
        abort(403)

    return post