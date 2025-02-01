# RhombixTechnologies_Tasks

# Network Sniffer

A simple network sniffer built using Python and Scapy to capture and analyze network traffic in real-time.

## Features
- Captures live network packets.
- Displays source and destination IP addresses.
- Supports various network protocols.
- Lightweight and efficient.

## Prerequisites
- Python 3.x
- Scapy library

## Installation
1. Clone the repository:
   
   git clone https://github.com/TalhaGurmani/RhombixTechnologies_Tasks/Network_Sniffer.py
   
   cd network-sniffer

   python3 Network_Sniffer.py
   
3. Install dependencies:
  
   pip install scapy


## Usage
Run the script with root/admin privileges:

sudo python Network_Sniffer.py

## Example Output

Starting Network sniffer ....
192.168.1.10 → 8.8.8.8 | IP / UDP 192.168.1.10:5050 > 8.8.8.8:53
192.168.1.20 → 192.168.1.1 | IP / TCP 192.168.1.20:443 > 192.168.1.1:52000
ARP who-has 192.168.1.1 tell 192.168.1.50

## Notes
- Requires root/admin privileges to sniff network packets.
- Modify the script to filter specific protocols if needed.

## License
This project is licensed under the MIT License.

## Contributing
Pull requests are welcome! Feel free to open an issue for suggestions or improvements.

