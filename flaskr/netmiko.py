from netmiko import ConnectHandler

def exec_comand(device):
    netConn = {
        'info':{
            'device_type': device['operating_system'],
            "ip": device['ip'],
            'host': device['hostname'],
            'username': device['username'],
            "password": device['password'],
            'secret': device['secret']
        },
        'conn': None
    }
    try:
        conn =  ConnectHandler(**netConn)
        conn.enable()
        host = conn.find_prompt()
        
        device['conn'] = conn
        print(f"conectado a {netConn['info']['host']}")
    
    except Exception as e:
        print(f"falló conexion con {netConn['info']['ip']}")
    
    return netConn

def ping(device):
    try:
        conn = device['conn']
        conn.enable()
        r = conn.send_command(f"ping {ip}")
        print(f"ping:\n{r}")
        return True
    except Exception as e:
        print(f"ping fallido: {e}")
        return False
