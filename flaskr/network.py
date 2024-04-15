from flask import (
    Blueprint, flash, jsonify, json, session, redirect, render_template, request, url_for
)
from werkzeug.exceptions import abort

from flaskr.auth import login_required
from flaskr.database.db import get_db

from flaskr.netmiko import netManager

netManager = netManager()

bp = Blueprint('network', __name__)

# vistas
@bp.route('/')
@login_required
def index():
    return render_template('network/index.html')

@bp.route('/automatization')
@login_required
def automatization():
    return render_template('network/automatization.html')

@bp.route('/advance')
@login_required
def advance():
    return render_template('network/advance.html')

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

# API
@bp.route("/api/devices", methods=['GET', 'POST'])
@login_required
def get_devices():
    deviceList = []
    result = []

    try:
        db = get_db()
        deviceList = get_db().execute(
            """
                SELECT *
                FROM Device
            """
        ).fetchall()
        branchList = get_db().execute(
            """
                SELECT *
                FROM Branch
            """
        ).fetchall()
        branch_map = {branch[0]: {"name": branch[1], "devices": []} for branch in branchList}

        for device in deviceList:
            if device[2] in branch_map:
                branch_map[device[2]]['devices'].append(dict(device))

    except db.IntegrityError:
        print('error al obtener la lista de dispositivos')

    return jsonify(branch_map)

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

    results = [dict(row) for row in branchList]

    return json.dumps(results)

@bp.route("/api/exec", methods=['GET', 'POST'])
@login_required
def exec():
    ip = request.json
    device = get_device_by_ip(ip)
    print('exec', device)
    device = dict(device)
    # abrir conn para mantener el acceso a la terminal
    # netManager.exec_comand(device)

    return jsonify({'exec':[]})

@bp.route("/api/conn", methods=['GET', 'POST'])
@login_required
def conn():
    ip = request.json
    device = get_device_by_ip(ip)
    device = netManager.open_conn(dict(device))
    print('conn', netManager.open_conn_list)

    return jsonify({'conn':device['conn']})

@bp.route("/api/ping", methods=['GET', 'POST'])
@login_required
def ping():
    ip = request.json
    status = netManager.ping(ip)
    print('ping: ', status)

    return jsonify({'ping':None})

# util
def get_device_by_ip(ip):
    device = None
    try:
        db = get_db()
        device = db.execute(
            """
            SELECT *
            FROM Device
            WHERE ip = ?
            """,
            (ip,)
        ).fetchone()
    except db.IntegrityError:
        print('Error al obtener el dispositivo por dirección IP:', ip)
    return device
