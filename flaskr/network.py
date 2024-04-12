from flask import (
    Blueprint, flash, json, g, redirect, render_template, request, url_for
)
from werkzeug.exceptions import abort

from flaskr.auth import login_required
from flaskr.database.db import get_db

bp = Blueprint('network', __name__)

@bp.route('/')
@login_required
def index():
    return render_template('network/index.html')

@bp.route('/manageDevice', methods=('GET', 'POST'))
@login_required
def manageDevice():
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

    return render_template('network/device.html')

@bp.route('/manageBranch', methods=('GET', 'POST'))
@login_required
def manageBranch():
    if request.method == 'POST':
        print(request.form)

        try:
            db = get_db()
            db.execute(
                """
                    INSERT INTO Branch (
                        name
                    ) VALUES (?)
                """,
                (
                    request.form['name'],
                )
            )
            db.commit()
        except db.IntegrityError:
            print(f"error al registrar una sucursal nueva: {db.IntegrityError}")

    return render_template('network/branch.html')

@bp.route('/manageUser', methods=('GET', 'POST'))
@login_required
def manageUser():
    db = get_db()
    users = db.execute(
        'SELECT * '
        'FROM user'
    ).fetchall()
    return render_template('network/user.html', users=users)

@bp.route("/api/devices", methods=['GET', 'POST'])
@login_required
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

    results = [tuple(row) for row in deviceList]
    # <class 'list'> of type <class 'tuple'>

    return json.dumps(results)

@bp.route("/api/branches", methods=['GET', 'POST'])
@login_required
def get_branches():
    branchList = []

    try:
        db = get_db()
        branchList = get_db().execute(
            """
                SELECT *
                FROM Branch
            """
        ).fetchall()
    except db.IntegrityError:
        print('error al obtener la lista de sucursales')

    print('sucursales', branchList)
    results = [tuple(row) for row in branchList]
    # print(f"{type(results)} of type {type(results[0])}")
    # <class 'list'> of type <class 'tuple'>

    return json.dumps(results)