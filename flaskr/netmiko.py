from netmiko import ConnectHandler

def exec_comand(device):
    try:
        conn =  ConnectHandler(**device['info'])
        conn.enable()
        host = conn.find_prompt()
        
        device['conn'] = conn
        print(f"conectado a {device['info']['host']}")
    
    except Exception as e:
        print(f"falló conexion con {device['info']['host']}")
        device['conn'] = False
    # device['conn'] = True
    
    return device

def ping(self, ip):
    try:
        conn = self.adminHost['monterrey']['router']['192.168.70.1']['conn']
        conn.enable()
        r = conn.send_command(f"ping {ip}")
        print(f"ping:\n{r}")
        return True
    except Exception as e:
        print(f"ping fallido: {e}")
        return False
