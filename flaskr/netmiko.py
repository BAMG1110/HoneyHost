import platform    # For getting the operating system name
import subprocess  # For executing a shell command
from netmiko import ConnectHandler

class netManager:
    def __init__(self):
        self.open_conn_list = []
        
    def exec_comand(self, ip, commands):
        device = self.find_opened_device(ip)
        commands = self.limpiar_comandos(commands)
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
            netConn['conn'] =  ConnectHandler(**netConn)
            netConn['conn'].enable()
            netConn['response'] = netConn['conn'].find_prompt()
            for command in commands:
                netConn['response'] += "\n" + netConn['conn'].send_command_timing(command)
        
        except Exception as e:
            netConn['response'] = f"falló conexion con {netConn['info']['ip']}"

        return netConn

    def open_conn(self, device):
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
            
            netConn['conn'] = conn
            print(f"conectado a {netConn['info']['host']}")
        
        except Exception as e:
            print(f"falló conexion con {netConn['info']['ip']}")
        
        # Verificar si el dispositivo ya está en la lista
        existing_device_ips = [conn['info']['ip'] for conn in self.open_conn_list]
        if device['ip'] not in existing_device_ips:
            self.open_conn_list.append(netConn)

        print('\nopen', self.open_conn_list,'\n')
        return netConn

    def ping(self, host):
        """
        Returns True if host (str) responds to a ping request.
        Remember that a host may not respond to a ping (ICMP) request even if the host name is valid.
        """

        # Option for the number of packets as a function of
        param = '-n' if platform.system().lower()=='windows' else '-c'

        # Building the command. Ex: "ping -c 1 google.com"
        command = ['ping', param, '1', host]

        return subprocess.call(command) == 0

    def find_opened_device(self, ip_busqueda):
        for dispositivo in self.open_conn_list:
            if dispositivo['ip'] == ip_busqueda:
                return dispositivo
        return None
    
    def buscar_mac_en_red(self, mac_address, deviceList):
        found_on_devices = []
        print('buscar_mac', mac_address)
        for branch in deviceList:
            for device in deviceList[branch]['devices']:
                print('\n device', device['ip'])
        # for device in deviceList:
        #     try:
        #         # Conectarse al dispositivo
        #         device_connection = ConnectHandler(**device)

        #         # Ejecutar el comando para buscar la dirección MAC en la tabla ARP
        #         output = device_connection.send_command("show ip arp | include " + mac_address)

        #         # Verificar si se encuentra la dirección MAC en la salida
        #         if mac_address in output:
        #             found_on_devices.append(device['ip'])

        #         # Cerrar la conexión
        #         device_connection.disconnect()

        #     except Exception as e:
        #         print(f"No se pudo conectar al dispositivo {device['ip']}. Error: {str(e)}")

        return 'found_on_devices'

    def limpiar_comandos(self, texto):
        lineas = texto.split('\n')
        comandos = [linea.strip() for linea in lineas if linea.strip()]
        return comandos
